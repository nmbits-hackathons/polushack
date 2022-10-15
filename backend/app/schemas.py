import datetime
import uuid
from typing import List, Optional


from fastapi_users import schemas

from pydantic import BaseModel


class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str
    position: str
    description: Optional[str]
    pass


class UserCreate(schemas.BaseUserCreate):
    name: str
    position: str
    description: Optional[str]
    pass


class UserUpdate(schemas.BaseUserUpdate):
    name: str
    position: str
    description: Optional[str]
    pass


# ___________________________________________________

class TechnicsCharacteristic(BaseModel):  # характеристики транспорта
    type: str = "dumptruck"  # dumptruck, excavator, bulldozer
    speed: int = 20  # необходимая скорость (средняя)
    power: int = 20  # необходима мощность (средняя )
    operating_weight: int = 20  # максимальная эксплуатационная масса
    unloading_height: int = 20  # высота выгрузки

    class Config:
        orm_mode = True


# _________________________________________________________________________
class TechnicsModel(TechnicsCharacteristic):  # характеристики транспорта хранящегося в бд и используемого для выгрузки
    vin: str
    current_place: Optional[str] = "none"  # необходимое месторасположение транспорта
    current_creator: Optional[str] = "none"  # текущий заказчик использующий средство, None если никто не использует

    class Config:
        orm_mode = True


class ResponseTechnicsModel(TechnicsModel):  # сущность транспорта в ответе сервера
    id: str

    class Config:
        orm_mode = True


class TechnicsSeries(BaseModel):  # серии транспорта
    number_of_technics: int = 0
    series: List[ResponseTechnicsModel] = []


# _______________________________________________________________________________
class ReadCalendar(TechnicsCharacteristic):  # заявка поступающая до обработки
    title: Optional[str]
    description: Optional[str]
    creator: Optional[str]
    time_start: Optional[datetime.datetime]  # время начала работ
    time_end: Optional[datetime.datetime]  # время окончания работ
    priority: Optional[str]  # выставленный приоритет  low high medium
    to_place: Optional[str]  # куда назначили константа

    class Config:
        orm_mode = True


class BaseCalendar(ReadCalendar):  # заявка после обработки
    driver_id: Optional[str]
    vin: Optional[str]  # vin назначенной машины
    from_place: Optional[str]  # местоположение назначенной машины (все время меняется)
    distance: Optional[float]  # дистанция до назначенной машины пересчитывается
    average_time: Optional[datetime.datetime]  # время до достижения машиной конца пути (пересчитывается)
    status: Optional[str]  # статус заявки confirmable, cancelled, progress, pending

    class Config:
        orm_mode = True


class ResponseBaseCalendar(BaseCalendar):  # полная информация о заявке
    id: int

    class Config:
        orm_mode = True


class CalendarSeries(BaseModel):  # серии заявок
    number_of_calendars: int = 0
    series: List[ResponseBaseCalendar] = []


# ______________

# class AllOptional(pydantic.main.ModelMetaclass):
#     def __new__(self, name, bases, namespaces, **kwargs):
#         annotations = namespaces.get('__annotations__', {})
#         for base in bases:
#             annotations.update(base.__annotations__)
#         for field in annotations:
#             if not field.startswith('__'):
#                 annotations[field] = Optional[annotations[field]]
#         namespaces['__annotations__'] = annotations
#         return super().__new__(self, name, bases, namespaces, **kwargs)


class UpdateBaseCalendar(BaseModel):
    title: Optional[str]
    description: Optional[str]
    type: Optional[str]
    speed: Optional[int]
    power: Optional[int]
    operating_weight: Optional[int]
    unloading_height: Optional[int]
    creator: Optional[str]
    time_start: Optional[datetime.datetime]
    time_end: Optional[datetime.datetime]
    priority: Optional[str]
    to_place: Optional[str]
    driver_id: Optional[str]
    vin: Optional[str]  # обязательный параметр для обновления
    from_place: Optional[str]
    distance: Optional[str]
    average_time: Optional[datetime.datetime]
    status: Optional[str]
    id: int
