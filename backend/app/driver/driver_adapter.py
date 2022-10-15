import asyncio
from typing import Any, Optional, Union

from sqlalchemy import select

from app.db import User
from app.schemas import UserRead, UserSeries
from app.db import create_session


class DriverAdapter:
    @staticmethod
    def get_items() -> Any:
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(User))).scalars().all()

            calendar_series = UserSeries()
            for item_model in item_models:
                calendar_series.series.append(UserRead.from_orm(item_model))
                calendar_series.number_of_users += 1
        return calendar_series
