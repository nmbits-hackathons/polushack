from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)
from app.technics.baseadapter import TechnicsDatabaseAdapter
from app.schemas import TechnicsModel,ResponseTechnicsModel
from app.db import TechnicsTable

router = APIRouter(
    prefix='/technics', tags=['technics']
)


@router.post('/create_technics/', status_code=201, description="создание нового траспорта (только для диспетчера)")
def create_technics(technics_model: TechnicsModel) -> ResponseTechnicsModel:
    technics = TechnicsDatabaseAdapter.create_technics(technics_model=technics_model)
    return technics

@router.get('/get_technics_by_id/', status_code=201)
def get_technics_by_id(technics_id):
    technics = TechnicsDatabaseAdapter.get_technics_by_id(technics_id)
    return technics

@router.get('/get_technics_by_vin/', status_code=201)
def get_technics_by_id(technics_vin):
    technics = TechnicsDatabaseAdapter.get_technics_by_vin(technics_vin)
    return technics



@router.get('/get_technics/', status_code=201)
def get_technics():
    technics = TechnicsDatabaseAdapter.get_technics()
    return technics


@router.put('/update_technics/', status_code=201)
def update_technics():
    return 'test'


# @router.delete('/delete_technics_by_id/', status_code=201)
# def delete_technics(technics_id: int):
#     technics = TechnicsDatabaseAdapter.delete_technics_by_id()
#     return {'status': 'deleted'}
