from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)
from app.db import User
from app.technics.baseadapter import TechnicsDatabaseAdapter

from app.users import (
    SECRET,
    auth_backend,
    current_active_user,
    fastapi_users,
    google_oauth_client,
)

from app.schemas import BaseCalendar, ResponseBaseCalendar, TechnicsModel, ReadCalendar, UpdateBaseCalendar

from app.calendar.calendar_adapter import CalendarAdapter

# from user.routers import get_user_by_id
# from crypto.instructions import buy_nft


booking_router = APIRouter(
    prefix='/book',
    tags=['booking'],
)


@booking_router.post('/add_technics_request/',
                     description="создание новой заявки на технику для заказчика, идет симулирование обработки - в "
                                 "частности создается заявка со статусом active, так же назначается vin машины 239 "
                                 "(получаем ResponseBaseCalendar)")
def add_item(read_data: ReadCalendar, user: User = Depends(current_active_user)) -> ResponseBaseCalendar:
    item = BaseCalendar(**read_data.dict())
    item.creator = user.email
    item.status = "pending"

    response = CalendarAdapter.create_item(item_model=item)

    technics_vin = calculate_technics_vin(calendar_item=response)
    if technics_vin == "cancelled":
        changes = UpdateBaseCalendar(id=response.id)
        changes.status = "cancelled"
        response = CalendarAdapter.update_item(changes)
    elif technics_vin != "None":
        changes = UpdateBaseCalendar(id=response.id)
        changes.vin = technics_vin
        changes.status = "active"
        response = CalendarAdapter.update_item(changes)

    return response


router = APIRouter(
    tags=['calendar'],
)


def calculate_technics_vin(calendar_item):
    technics_items = TechnicsDatabaseAdapter.get_technics()
    if technics_items is None:
        return "None"
    does_exist_suitable = False
    for technics_item in technics_items.series:
        if technics_item.type != calendar_item.type:
            continue
        if calendar_item.speed > technics_item.speed:
            continue
        if calendar_item.power > technics_item.power:
            continue
        if calendar_item.operating_weight > technics_item.operating_weight:
            continue
        if calendar_item.unloading_height > technics_item.unloading_height:
            continue

        does_exist_suitable = True
        print(technics_item.type, technics_item.vin)
        all_calendar_events_with_this_vin = CalendarAdapter.get_items_by_vin(technics_item.vin)
        if all_calendar_events_with_this_vin is None:
            return technics_item.vin

        is_free = True
        for event in all_calendar_events_with_this_vin.series:
            if str(event.time_end) <= str(calendar_item.time_start):
                continue
            elif str(event.time_start) >= str(calendar_item.time_end):
                continue
            else:
                is_free = False
        if is_free:
            return technics_item.vin

    if not does_exist_suitable:
        return "cancelled"
    return "None"


@router.get('/get_items/', description="получение календаря заявок (получаем CalendarSeries)")
def get_items():
    items = CalendarAdapter.get_items()
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items


@router.get('/get_item_by_id/', status_code=200, description="получение календарной сущности по id (получаем "
                                                             "ResponseBaseCalendar)")
def get_item_by_id(item_id: int):
    item = CalendarAdapter.get_item_by_id(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put('/update_item/', status_code=200,
            description='функция обновления календарной записи, единственный обязательный параметр id записи, '
                        'так же указыватся поля которые необходимо заменить (получаем item_id)')
def update_item_by_id(item: UpdateBaseCalendar):
    CalendarAdapter.update_item(item_model=item)
    return 200


@router.delete('/delete_item_by_id/', status_code=200)
def delete_item_by_id(item_id: int):
    CalendarAdapter.delete_item(item_id=item_id)
    return 200


@router.get('/get_items_by_vin/', status_code=200)
def get_items_by_vin(item_vin: str):
    items = CalendarAdapter.get_items_by_vin(item_vin=item_vin)
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items


router.include_router(booking_router)
