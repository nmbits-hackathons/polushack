from typing import Any, Optional, Union

from app.db import Calendar, BaseCalendar
from app.db import create_session


class CalendarAdapter:
    @staticmethod
    def create_item(item_model: BaseCalendar) -> int:
        print('call create_item fun for \n', item_model)
        with create_session() as session:
            item = Calendar(**item_model.dict())
            session.add(item)
            # session.flush()
            # item_id = item.id
        return item.id

    @staticmethod
    def get_item_by_id(post_id: int) -> Union[BaseCalendar, None]:
        with create_session() as session:
            item_model = session.query(Calendar).get(post_id)
            if item_model is None:
                post = None
            else:
                post = BaseCalendar.from_orm(item_model)
        return post

    @staticmethod
    def get_items() -> Any:
        with create_session() as session:
            item_models = session.query(Calendar).all()
            if item_models is None:
                posts = None
            else:
                posts = [BaseCalendar.from_orm(item_model) for item_model in item_models]
        return posts

    # @staticmethod
    # def delete_item(item_id: int) -> None:
    #     with create_session() as session:
    #         item = session.query(DataMarketplaceItem).filter(DataMarketplaceItem.id == item_id).delete()
