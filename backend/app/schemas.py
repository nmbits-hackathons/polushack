import datetime
import uuid
from typing import List, Optional

from pydantic import BaseModel
from fastapi_users import schemas


class BaseCalendar(BaseModel):
    vin: Optional[str]
    creator: Optional[str]
    type: Optional[str]
    characteristic: Optional[str]
    from_place: Optional[str]
    to_place: Optional[str]
    distance: Optional[float]
    average_time: Optional[datetime.datetime]
    priority: Optional[str]
    time_start: Optional[str]
    time_end: Optional[str]
    status: Optional[str]

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

