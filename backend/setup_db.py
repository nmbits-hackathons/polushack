import requests
import json
import random

# ip = "127.0.0.1:8080"
ip = "45.67.228.220:8080"

headers = {
    'accept': 'application/json',
    # Already added when you pass json= but not when you pass data=
    # 'Content-Type': 'application/json',
}

json_data = {
    'type': 'dumptruck',
    'speed': 120,
    'power': 200,
    'operating_weight': 100,
    'unloading_height': 130,
    'vin': '239',
    'current_place': '56.58643328402244,37.29676133203371',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'dumptruck',
    'speed': 90,
    'power': 300,
    'operating_weight': 200,
    'unloading_height': 140,
    'vin': '450',
    'current_place': '54.69796872035692,42.306526957033704',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'dumptruck',
    'speed': 290,
    'power': 300,
    'operating_weight': 1000,
    'unloading_height': 59,
    'vin': '654',
    'current_place': '56.7074841165816,41.6253746132837',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

# json_data = {
#     'type': 'dumptruck',
#     'speed': 110,
#     'power': 450,
#     'operating_weight': 700,
#     'unloading_height': 61,
#     'vin': '912',
#     'current_place': 'none',
#     'current_creator': 'Polyus',
# }

# response = requests.post('http://127.0.0.1:8080/technics/create_technics/', headers=headers, json=json_data)

# json_data = {
#     'type': 'dumptruck',
#     'speed': 150,
#     'power': 320,
#     'operating_weight': 230,
#     'unloading_height': 71,
#     'vin': '186',
#     'current_place': 'none',
#     'current_creator': 'Polyus',
# }

# response = requests.post('http://127.0.0.1:8080/technics/create_technics/', headers=headers, json=json_data)


json_data = {
    'type': 'excavator',
    'speed': 12,
    'power': 1023,
    'operating_weight': 1300,
    'unloading_height': 115,
    'vin': '111',
    'current_place': '55.06534735541076,45.29480820703372',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 20,
    'power': 1200,
    'operating_weight': 1000,
    'unloading_height': 250,
    'vin': '112',
    'current_place': '54.2243460860465,34.50623398828371',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 30,
    'power': 1000,
    'operating_weight': 5000,
    'unloading_height': 100,
    'vin': '113',
    'current_place': '57.90837534408412,51.381233988283704',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 27,
    'power': 800,
    'operating_weight': 1550,
    'unloading_height': 105,
    'vin': '114',
    'current_place': '57.57939421099735,37.846077738283704',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 100,
    'power': 200,
    'operating_weight': 2400,
    'unloading_height': 52,
    'vin': '311',
    'current_place': '56.76786332336763,30.726937113283697',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 110,
    'power': 300,
    'operating_weight': 2000,
    'unloading_height': 55,
    'vin': '312',
    'current_place': '58.37315529036744,49.22791367578371',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 210,
    'power': 250,
    'operating_weight': 1600,
    'unloading_height': 57,
    'vin': '313',
    'current_place': '57.62657559263821,31.517952738283704',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 115,
    'power': 180,
    'operating_weight': 3600,
    'unloading_height': 54,
    'vin': '314',
    'current_place': '53.88822862216836,31.913460550783693',
    'current_creator': 'Polyus',
}

response = requests.post(f'http://{ip}/technics/create_technics/', headers=headers, json=json_data)


# json_data = {
#     'type': 'bulldozer',
#     'speed': 80,
#     'power': 230,
#     'operating_weight': 1800,
#     'unloading_height': 51,
#     'vin': '315',
#     'current_place': 'none',
#     'current_creator': 'Polyus',
# }

# response = requests.post('http://127.0.0.1:8080/technics/create_technics/', headers=headers, json=json_data)


# --------------- Users -------------------

json_data = {
    'email': 'manager1@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'manager1',
    'position': 'dispatcher',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'manager2@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'manager2',
    'position': 'dispatcher',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'worker1@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'worker1',
    'position': 'driver',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'worker2@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'worker2',
    'position': 'driver',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()


json_data = {
    'email': 'worker3@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'worker3',
    'position': 'driver',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'worker4@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'worker4',
    'position': 'driver',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'client1@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'client1',
    'position': 'customer',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

json_data = {
    'email': 'client2@example.com',
    'password': 'string',
    'is_active': True,
    'is_superuser': False,
    'is_verified': False,
    'name': 'client2',
    'position': 'customer',
    'description': 'string',
}

response = requests.post(f'http://{ip}/auth/register', headers=headers, json=json_data)

print(response.text)
print()

data = {
    'grant_type': '',
    'username': 'manager1@example.com',
    'password': 'string',
    'scope': '',
    'client_id': '',
    'client_secret': '',
}

response = requests.post(f'http://{ip}/auth/jwt/login', headers=headers, data=data)
token = json.loads(response.text)["token_type"] + " " + json.loads(response.text)["access_token"]
print(token)

headers = {
    'accept': 'application/json',
    'Authorization': token,
}

a = 57.655811779493945
b = 58.683084557890254
k = 5

geoposition_list = []
for i in range(13):
    c1 = random.random()
    c2 = random.random()

    d1 = a + c1 * k
    d2 = b + c2 * k

    geoposition_list.append("".join(str([d1, d2]).split(" "))[:-1][1:])

print(geoposition_list)


json_data = {
    'type': 'dumptruck',
    'speed': 100,
    'power': 300,
    'operating_weight': 100,
    'unloading_height': 100,
    'title': 'string',
    'description': 'string',
    'creator': 'manager1@example.com',
    'time_start': '2022-10-18 17:18:00.854000',
    'time_end': '2022-10-21 07:18:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[0],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'dumptruck',
    'speed': 80,
    'power': 200,
    'operating_weight': 100,
    'unloading_height': 30,
    'title': 'string',
    'description': 'string',
    'creator': 'client1@example.com',
    'time_start': '2022-10-20 07:18:00.854000',
    'time_end': '2022-10-20 20:20:00.854000',
    'priority': 'medium',
    'to_place': geoposition_list[1],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'dumptruck',
    'speed': 200,
    'power': 200,
    'operating_weight': 100,
    'unloading_height': 30,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-19 07:30:00.854000',
    'time_end': '2022-10-21 07:30:00.854000',
    'priority': 'high',
    'to_place': geoposition_list[2],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'dumptruck',
    'speed': 150,
    'power': 100,
    'operating_weight': 100,
    'unloading_height': 20,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-19 07:30:00.854000',
    'time_end': '2022-10-21 07:30:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[3],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 20,
    'power': 800,
    'operating_weight': 500,
    'unloading_height': 100,
    'title': 'string',
    'description': 'string',
    'creator': 'manager1@example.com',
    'time_start': '2022-10-18 17:18:00.854000',
    'time_end': '2022-10-21 07:18:00.854000',
    'priority': 'high',
    'to_place': geoposition_list[4],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 30,
    'power': 1000,
    'operating_weight': 500,
    'unloading_height': 100,
    'title': 'string',
    'description': 'string',
    'creator': 'manager1@example.com',
    'time_start': '2022-10-20 07:18:00.854000',
    'time_end': '2022-10-20 20:20:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[5],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)


json_data = {
    'type': 'excavator',
    'speed': 10,
    'power': 300,
    'operating_weight': 500,
    'unloading_height': 70,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-19 07:30:00.854000',
    'time_end': '2022-10-21 07:30:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[6],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'excavator',
    'speed': 10,
    'power': 1000,
    'operating_weight': 500,
    'unloading_height': 100,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-22 07:18:00.854000',
    'time_end': '2022-10-25 07:45:00.854000',
    'priority': 'medium',
    'to_place': geoposition_list[7],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 100,
    'power': 200,
    'operating_weight': 1000,
    'unloading_height': 50,
    'title': 'string',
    'description': 'string',
    'creator': 'manager1@example.com',
    'time_start': '2022-10-18 17:18:00.854000',
    'time_end': '2022-10-21 07:18:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[8],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 100,
    'power': 210,
    'operating_weight': 1000,
    'unloading_height': 47,
    'title': 'string',
    'description': 'string',
    'creator': 'manager1@example.com',
    'time_start': '2022-10-20 07:18:00.854000',
    'time_end': '2022-10-20 20:20:00.854000',
    'priority': 'medium',
    'to_place': geoposition_list[9],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 70,
    'power': 100,
    'operating_weight': 1000,
    'unloading_height': 46,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-19 07:30:00.854000',
    'time_end': '2022-10-21 07:30:00.854000',
    'priority': 'low',
    'to_place': geoposition_list[10],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

json_data = {
    'type': 'bulldozer',
    'speed': 100,
    'power': 100,
    'operating_weight': 1000,
    'unloading_height': 51,
    'title': 'string',
    'description': 'string',
    'creator': 'manager2@example.com',
    'time_start': '2022-10-20 07:18:00.854000',
    'time_end': '2022-10-25 07:45:00.854000',
    'priority': 'high',
    'to_place': geoposition_list[11],
}

response = requests.post(f'http://{ip}/book/add_technics_request/', headers=headers, json=json_data)

print()
