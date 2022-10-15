import asyncio
from typing import Optional, Union, Any

from app.schemas import TechnicsSeries, TechnicsModel, ResponseTechnicsModel
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
    def get_technics_by_vin(technics_vin: int) -> ResponseTechnicsModel:
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

    # @staticmethod
    # def delete_technics_by_id(): -> Any:
