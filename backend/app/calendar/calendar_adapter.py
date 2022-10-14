import asyncio
from typing import Any, Optional, Union

from sqlalchemy import select

from app.db import Calendar
from app.schemas import BaseCalendar, ResponseBaseCalendar, CalendarSeries
from app.db import create_session


class CalendarAdapter:
    @staticmethod
    def create_item(item_model: BaseCalendar) -> int:
        with create_session() as session:
            item = Calendar(**item_model.dict())
            session.add(item)
            asyncio.run(session.flush())
            item_id = item.id
        return item_id

    @staticmethod
    def get_item_by_id(item_id: int) -> Union[ResponseBaseCalendar, None]:
        with create_session() as session:
            item_model = asyncio.run(session.get(Calendar, item_id))

            if item_model is None:
                post = None
            else:
                post = ResponseBaseCalendar.from_orm(item_model)
        return post

    @staticmethod
    def get_items() -> Any:
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(Calendar))).scalars().all()

            if item_models is None:
                posts = None
            else:
                posts = [ResponseBaseCalendar.from_orm(item_model) for item_model in item_models]

            calendar_series = CalendarSeries()
            for item_model in item_models:
                calendar_series.series.append(ResponseBaseCalendar.from_orm(item_model))
                calendar_series.number_of_calendars += 1
        return calendar_series
