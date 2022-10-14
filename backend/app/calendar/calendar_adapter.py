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

    @staticmethod
    def delete_item(item_id: int) -> None:
        with create_session() as session:
            item_model = asyncio.run(session.get(Calendar, item_id))
            asyncio.run(session.delete(item_model))
            asyncio.run(session.commit())

    @staticmethod
    def update_item(item_model: ResponseBaseCalendar) -> int:
        with create_session() as session:
            item_model = Calendar(**item_model.dict())
            old_item_model = asyncio.run(session.get(Calendar, item_model.id))

            if item_model.vin is not None:
                old_item_model.vin = item_model.vin
            if item_model.creator is not None:
                old_item_model.creator = item_model.creator
            if item_model.type is not None:
                old_item_model.type = item_model.type
            if item_model.characteristic is not None:
                old_item_model.characteristic = item_model.characteristic
            if item_model.from_place is not None:
                old_item_model.from_place = item_model.from_place
            if item_model.to_place is not None:
                old_item_model.to_place = item_model.to_place
            if item_model.distance is not None:
                old_item_model.distance = item_model.distance
            if item_model.average_time is not None:
                old_item_model.average_time = item_model.average_time
            if item_model.priority is not None:
                old_item_model.priority = item_model.priority
            if item_model.time_start is not None:
                old_item_model.time_start = item_model.time_start
            if item_model.time_end is not None:
                old_item_model.time_end = item_model.time_end
            if item_model.status is not None:
                old_item_model.status = item_model.status

            asyncio.run(session.flush())
            item_id = old_item_model.id
        return item_id
