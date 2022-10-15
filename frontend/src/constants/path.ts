export const MAIN_PATH = "/"
export const REGISTER_PATH = "/register"
export const USERS_PATH = "/users"
export const TRANSPORT_PATH = "/application"
export const MAPS_PATH = "/maps"
export const REGISTER_USER = "/users/register"

export const BASE_API = process.env.BASE_API
export const LOGIN_API = `${BASE_API}/auth/jwt/login`
export const REGISTER_API = `${BASE_API}/auth/register`
export const SESSION_API = `${BASE_API}/users/me`
export const ADD_APPLICATION = `${BASE_API}/book/add_technics_request/`
export const GET_APPLICATION = `${BASE_API}/get_items/`
export const GET_TRANSPORT_API = `${BASE_API}/technics/get_technics/`
