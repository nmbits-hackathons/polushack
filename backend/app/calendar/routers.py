from fastapi import (
    APIRouter,
    Depends,
    status,
    Request,
    HTTPException
)

from app.db import BaseCalendar

from app.calendar.calendar_adapter import CalendarAdapter
# from user.routers import get_user_by_id
# from crypto.instructions import buy_nft

router = APIRouter(
    prefix='/calendar',
    tags=['calendar'],
)


@router.get('/get_items/')
def get_items():
    items = CalendarAdapter.get_items()
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items


@router.post('/add_item/')
def add_item(
        item: BaseCalendar,
):
    item_id = CalendarAdapter.create_item(item_model=item)
    return item_id


@router.get('/get_item_by_id/', status_code=200)
def get_item_by_id(item_id: int):
    item = CalendarAdapter.get_item_by_id(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


# @router.delete('/delete_item_by_id/', status_code=200)
# def delete_item_by_id(
#         item_id: int,
# ):
#     MarketDatabaseAdapter.delete_item(item_id=item_id)
#     return 200

#
# @router.post('/buy_nft/')
# def buy_nft_route(
#         item_id: int,
#         user_id: int,
# ):
#     buyer = get_user_by_id(user_id=user_id)
#     item = get_item_by_id(item_id=item_id)
#     seller = get_user_by_id(user_id=item.nft_owner_id)
#
#     buy_nft(nft_id=item.nft_id, buyer_public=buyer.public_key, seller_public=seller.public_key,
#             buyer_private=buyer.private_key, seller_private=seller.private_key, roubles=item.cost)
#     return 200
