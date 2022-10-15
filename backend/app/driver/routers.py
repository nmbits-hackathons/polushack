from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)

from app.driver.driver_adapter import DriverAdapter

router = APIRouter(
    prefix='/driver', tags=['driver']
)


@router.get('/get_users/', description="получение списка пользователей (получаем UserSeries)")
def get_items():
    items = DriverAdapter.get_items()
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items

