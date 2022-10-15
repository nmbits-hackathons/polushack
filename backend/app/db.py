import asyncio
from typing import AsyncGenerator, List

from fastapi import Depends
from fastapi_users.db import (
    SQLAlchemyBaseOAuthAccountTableUUID,
    SQLAlchemyBaseUserTableUUID,
    SQLAlchemyUserDatabase,
)
from sqlalchemy import (
    Column,
    Integer,
    String,
    BOOLEAN,
    DATETIME,
    Float,
    TIMESTAMP,
)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import Column, String, sql
import configparser
from contextlib import asynccontextmanager
import sqlalchemy
from sqlalchemy.util.compat import contextmanager

config = configparser.ConfigParser()  # создаём объекта парсера
config.read("appsettings.ini")  # читаем конфиг

DATABASE_URL = config["BDConfig"]["url"]

Base: DeclarativeMeta = declarative_base()


class Calendar(Base):
    __tablename__ = 'Calendar'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    # необходимые хакактеристики машины в заявке
    type = Column(String)  # dumptruck, excavator, bulldozer
    speed = Column(Integer)  # необходимая скорость (средняя)
    power = Column(Integer)  # необходима мощность (средняя )
    operating_weight = Column(Integer)  # максимальная эскплатауционная масса
    unloading_height = Column(Integer)  # высота выгрузки

    # необходмиые данные при созданиии заявки
    creator = Column(String)
    to_place = Column(String)  # куда назначили константа
    time_start = Column(DATETIME)  # время начала работ
    time_end = Column(DATETIME)  # время окончания работ
    priority = Column(String)  # выставленный приоритет  low high medium

    # данные хранимые после создания текущей заявки
    vin = Column(String)
    from_place = Column(String)  # обновляем из данных по вину, каждые 5 минут например
    distance = Column(String)  # дистанция до назначенной машины пересчитывется
    average_time = Column(DATETIME)  # время до достижения машиной конца пути ( пересчитывается)

    status = Column(String)  # статус заявки confirmable, cancelled, progress, pending


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    oauth_accounts: List[OAuthAccount] = relationship("OAuthAccount", lazy="joined")

    name = Column(String)
    position = Column(
        String(length=100),
        server_default=sql.expression.literal("No name given"),
        nullable=False,
    )

    description = Column(String)


class TechnicsTable(Base):
    __tablename__ = 'Technics'

    id = Column(Integer, primary_key=True)

    vin = Column(String)

    type = Column(String)  # dumptruck, excavator, bulldozer
    speed = Column(Integer)  # необходимая скорость (средняя)
    power = Column(Integer)  # необходима мощность (средняя )
    operating_weight = Column(Integer)  # максимальная эскплатауционная масса
    unloading_height = Column(Integer)  # высота выгрузки

    current_place = Column(String)  # необходимое месторасположение траспорта
    current_creator = Column(String)  # текущий заказчик использующий средство,  None если никто не использует


engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# engine1 = sqlalchemy.create_engine(
#     DATABASE_URL,
#     connect_args={"check_same_thread": False},
# )
#
# Session = sessionmaker(
#     bind=engine1,
#     autocommit=False,
#     autoflush=False,
# )


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)


@contextmanager
def create_session():
    session = async_session_maker()
    try:
        yield session
        asyncio.run(session.commit())
    except Exception:
        asyncio.run(session.rollback())
        raise
    finally:
        asyncio.run(session.close())
