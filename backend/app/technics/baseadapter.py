import asyncio
from typing import Optional, Union, Any

from app.schemas import TechnicsSeries, TechnicsModel, ResponseTechnicsModel, UpdateTechnicsModel
from app.db import create_session, TechnicsTable

from sqlalchemy import select

from sqlalchemy import or_
from sqlalchemy import and_


class TechnicsDatabaseAdapter:
    @staticmethod
    def create_technics(technics_model: TechnicsModel) -> int:
        print('call create_technics fun\n', technics_model)
        with create_session() as session:
            technics = TechnicsTable(**technics_model.dict())
            session.add(technics)
            asyncio.run(session.flush())
            technics_response = ResponseTechnicsModel.from_orm(technics)
        return technics_response

    @staticmethod
    def get_technics_by_id(technics_id: int) -> ResponseTechnicsModel:
        with create_session() as session:
            technics_model = asyncio.run(session.get(TechnicsTable, technics_id))

            if technics_model is None:
                post = None
            else:
                post = ResponseTechnicsModel.from_orm(technics_model)
        return post

    @staticmethod
    def get_technics_by_vin(technics_vin: str) -> ResponseTechnicsModel:
        with create_session() as session:
            technics_model = asyncio.run(
                session.execute(select(TechnicsTable).filter(TechnicsTable.vin == technics_vin))).scalars().first()

        return ResponseTechnicsModel.from_orm(technics_model)

    @staticmethod
    def get_technics() -> Any:
        with create_session() as session:
            item_models = asyncio.run(session.execute(select(TechnicsTable))).scalars().all()
            technics = TechnicsSeries()
            for i in item_models:
                technics.series.append(ResponseTechnicsModel.from_orm(i))
                technics.number_of_technics += 1
        return technics

    @staticmethod
    def update_item(item_model: UpdateTechnicsModel) -> int:
        with create_session() as session:
            item_model = TechnicsTable(**item_model.dict())
            old_item_model = asyncio.run(session.get(TechnicsTable, item_model.id))

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
            if item_model.vin is not None:
                old_item_model.vin = item_model.vin
            if item_model.current_place is not None:
                old_item_model.current_place = item_model.current_place
            if item_model.current_creator is not None:
                old_item_model.current_creator = item_model.current_creator
            if item_model.job_user_id is not None:
                old_item_model.job_user_id = item_model.job_user_id
            if item_model.is_job is not None:
                old_item_model.is_job = item_model.is_job

            asyncio.run(session.flush())
        return old_item_model

    # @staticmethod
    # def delete_technics_by_id(): -> Any:
