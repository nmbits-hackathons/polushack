import datetime
import uuid
from typing import List

from pydantic import BaseModel
from fastapi_users import schemas


class BaseCalendar(BaseModel):
    vin: str
    creator: str
    type: str
    characteristic: str
    from_place: str
    to_place: str
    distance: float
    average_time: datetime.datetime
    priority: str
    time_start: str
    time_end: str
    status: str

    class Config:
        orm_mode = True


class ResponseBaseCalendar(BaseCalendar):
    id: int

    class Config:
        orm_mode = True


class CalendarSeries(BaseModel):
    number_of_calendars: int = 0
    series: List[ResponseBaseCalendar] = []


class UserRead(schemas.BaseUser[uuid.UUID]):
    role: str
    pass


class UserCreate(schemas.BaseUserCreate):
    role: str
    pass


class UserUpdate(schemas.BaseUserUpdate):
    role: str 
    pass

