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
from sqlalchemy import Column,String,sql
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

    vin = Column(String)
    creator = Column(String)
    type = Column(String)
    characteristic = Column(String)
    from_place = Column(String)
    to_place = Column(String)
    distance = Column(Float)
    average_time = Column(DATETIME)
    priority = Column(String)
    time_start = Column(String)
    time_end = Column(String)
    status = Column(String)


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    oauth_accounts: List[OAuthAccount] = relationship("OAuthAccount", lazy="joined")

    role = Column(
        String(length=100),
        server_default=sql.expression.literal("No name given"),
        nullable=False,
    )


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
