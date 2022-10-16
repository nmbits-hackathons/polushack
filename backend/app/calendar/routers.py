import copy
from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)
from app.db import User
from app.technics.baseadapter import TechnicsDatabaseAdapter
import random

from app.users import (
    SECRET,
    auth_backend,
    current_active_user,
    fastapi_users,
    google_oauth_client,
)

from app.schemas import BaseCalendar, ResponseBaseCalendar, TechnicsModel, ReadCalendar, UpdateBaseCalendar, \
    ResponseTechnicsModel, UpdateTechnicsModel

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
def add_item(read_data: ReadCalendar) -> ResponseBaseCalendar:
    item = BaseCalendar(**read_data.dict())
    # item.creator = user.email
    item.status = "pending"

    response = CalendarAdapter.create_item(item_model=item)

    technics_vin = calculate_technics_vin(calendar_item=response)
    if technics_vin == "cancelled":
        changes = UpdateBaseCalendar(id=response.id)
        changes.status = "cancelled"
        CalendarAdapter.update_item(changes)
    elif technics_vin != "None":
        changes = UpdateBaseCalendar(id=response.id)
        changes.vin = technics_vin
        changes.status = "active"
        CalendarAdapter.update_item(changes)

        technics_id = TechnicsDatabaseAdapter.get_technics_by_vin(technics_vin).id
        changes = UpdateTechnicsModel(id=technics_id)
        changes.is_job = True
        TechnicsDatabaseAdapter.update_item(changes)

    return response


router = APIRouter(
    tags=['calendar'],
)


class Times:
    time_start: Optional[str]
    time_end: Optional[str]
    id: Optional[int]
    times = []

    def __lt__(self, other):
        if self.time_start == other.time_start:
            return self.time_end < other.time_end
        return self.time_start < other.time_start


def search_for_optimal_solution_one_priority(list_technics, list_calendar):
    # list_technics [ {id, times = []} ]
    # list_calendar [ {time_start, time_end, id} ]

    end_result_list = [0] * len(list_calendar)

    list_calendar.sort()  # sorted by time_start, time_end
    for i in range(len(list_calendar)):
        possible_variations = [i]
        for j in range(i + 1, len(list_calendar)):
            if list_calendar[j].time_end > list_calendar[i].time_start:
                break
            possible_variations.append(j)

        result = dict()
        result["number"] = len(list_technics) + 1
        result["answer"] = []
        for k in range(len(possible_variations)):
            save_list_technics = copy.deepcopy(list_technics)  # try not to damage real data
            unique_technics = set()

            random.shuffle(possible_variations)     # implement some other functions
            created_list = []
            for j in possible_variations:
                created_list.append(list_calendar[j])
            remember_technic_for_out_event = None
            for technics_index in range(len(list_technics)):
                technics = save_list_technics[technics_index]
                for check_event in created_list:
                    suitable = True
                    for technics_event in technics.times:
                        if str(check_event.time_end) < str(technics_event.time_start):
                            continue
                        if str(check_event.time_start) > str(technics_event.time_end):
                            continue
                        suitable = False
                        break
                    if suitable:
                        unique_technics.add(technics_index)
                        save_list_technics[technics_index].times.append(check_event)
                        if check_event.id == list_calendar[i].id:
                            remember_technic_for_out_event = technics_index
            if len(unique_technics) <= result["number"]:
                result["number"] = len(unique_technics)
                result["answer"] = remember_technic_for_out_event
        new_obj = Times()
        new_obj.time_start = list_calendar[i].time_start,
        new_obj.time_end = list_calendar[i].time_end,
        list_technics[result["answer"]].times.append(new_obj)
        end_result_list[i] = list_technics[result["answer"]].id
    return end_result_list


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

        input_list_technics = []
        input_list_calendar = []

        request_list = TechnicsDatabaseAdapter.get_technics()
        if request_list is not None:
            input_list_technics = request_list.series

        request_list = CalendarAdapter.get_items()
        if request_list is not None:
            input_list_calendar = request_list.series

        for i in range(len(input_list_technics)):
            new_obj = Times()
            new_obj.id = input_list_technics[i].id
            new_obj.times = []
            input_list_technics[i] = new_obj

        for i in range(len(input_list_calendar)):
            new_obj = Times()
            new_obj.id = input_list_calendar[i].id
            new_obj.time_start = input_list_calendar[i].time_start
            new_obj.time_end = input_list_calendar[i].time_end
            input_list_calendar[i] = new_obj

        try:
            search_for_optimal_solution_one_priority(input_list_technics, input_list_calendar)
        except Exception:
            print("Have worked")

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
