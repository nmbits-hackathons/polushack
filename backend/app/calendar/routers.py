from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)
from app.db import User

from app.users import (
    SECRET,
    auth_backend,
    current_active_user,
    fastapi_users,
    google_oauth_client,
)

from app.schemas import BaseCalendar, ResponseBaseCalendar, TechnicsModel, ReadCalendar,UpdateBaseCalendar

from app.calendar.calendar_adapter import CalendarAdapter

# from user.routers import get_user_by_id
# from crypto.instructions import buy_nft


booking_router = APIRouter(
    prefix='/book',
    tags=['booking'],
)


@booking_router.post('/add_technics_request/',
                     description="создание новой заявки на технику для заказчика, идет симулирование обработки - в частности создаетсчя заявка со статусом active, так же назначается vin машины 239 ")
def add_item(read_data: ReadCalendar, user: User = Depends(current_active_user)) -> ResponseBaseCalendar:

    item = BaseCalendar(**read_data.dict())
    item.creator = user.email
    item.vin = 239
    item.status = "active"

    response = CalendarAdapter.create_item(item_model=item)
    return response


router = APIRouter(
    tags=['calendar'],
)


@router.post('/add_item/', description="только для диспетчера - добавление записи в календарь")
def add_item(item: BaseCalendar):
    item_id = CalendarAdapter.create_item(item_model=item)
    return item_id


@router.get('/get_items/', description="получение календаря заявок")
def get_items():
    items = CalendarAdapter.get_items()
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items


@router.get('/get_item_by_id/', status_code=200, description="получение календарной сущности по id")
def get_item_by_id(item_id: int):
    item = CalendarAdapter.get_item_by_id(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item



@router.put('/update_item/', status_code=200,description='функция обновления календарной записи, единственный обязательный параметр id записи, так же указыватся поля которые необходимо заменить')
def update_item_by_id(item: UpdateBaseCalendar):
    print(2)
    print(item)
    CalendarAdapter.update_item(item_model=item)
    return 200


@router.delete('/delete_item_by_id/', status_code=200)
def delete_item_by_id(item_id: int):
    CalendarAdapter.delete_item(item_id=item_id)
    return 200


router.include_router(booking_router)
