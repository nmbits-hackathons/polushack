import asyncio
from typing import Any, Optional, Union

from sqlalchemy import select

from app.db import Calendar
from app.schemas import BaseCalendar, ResponseBaseCalendar, CalendarSeries, UpdateBaseCalendar
from app.db import create_session


class CalendarAdapter:
    @staticmethod
    def create_item(item_model: BaseCalendar) -> Any:
        with create_session() as session:
            item = Calendar(**item_model.dict())
            session.add(item)
            asyncio.run(session.flush())
            item_response = ResponseBaseCalendar.from_orm(item)

        return item_response

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
    def get_items_by_vin(item_vin: str) -> Any:
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(Calendar).filter(Calendar.vin == item_vin))).scalars().all()

            calendar_series = CalendarSeries()
            for item_model in item_models:
                calendar_series.series.append(ResponseBaseCalendar.from_orm(item_model))
                calendar_series.number_of_calendars += 1
        return calendar_series

    @staticmethod
    def get_items() -> Any:
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(Calendar))).scalars().all()

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
    def update_item(item_model: UpdateBaseCalendar) -> int:
        with create_session() as session:
            item_model = Calendar(**item_model.dict())
            old_item_model = asyncio.run(session.get(Calendar, item_model.id))

            if item_model.type is not None:
                old_item_model.type = item_model.type
            if item_model.speed is not None:
                old_item_model.speed = item_model.speed
            if item_model.power is not None:
                old_item_model.power = item_model.power
            if item_model.operating_weight is not None:
                old_item_model.operating_weight = item_model.operating_weight
            if item_model.unloading_height is not None:
                old_item_model.unloading_height = item_model.unloading_height
            if item_model.creator is not None:
                old_item_model.creator = item_model.creator
            if item_model.current_place is not None:
                old_item_model.current_place = item_model.current_place
            if item_model.time_start is not None:
                old_item_model.time_start = item_model.time_start
            if item_model.time_end is not None:
                old_item_model.time_end = item_model.time_end
            if item_model.priority is not None:
                old_item_model.priority = item_model.priority
            if item_model.vin is not None:
                old_item_model.vin = item_model.vin
            if item_model.from_place is not None:
                old_item_model.from_place = item_model.from_place
            if item_model.distance is not None:
                old_item_model.distance = item_model.distance
            if item_model.average_time is not None:
                old_item_model.average_time = item_model.average_time
            if item_model.status is not None:
                old_item_model.status = item_model.status

            asyncio.run(session.flush())
        return old_item_model

    @staticmethod
    def get_by_priority(priority: str):
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(Calendar).filter(Calendar.priority == priority))).scalars().all()
            calendar_series = CalendarSeries()
            for item_model in item_models:
                calendar_series.series.append(ResponseBaseCalendar.from_orm(item_model))
                calendar_series.number_of_calendars += 1
        return calendar_series