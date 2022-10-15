import React from "react";
import Users from "pages/Users";
import Transport from "pages/Transport";
import Application from "pages/Application";
import Maps from "pages/Maps";
import Register from "pages/Register";
import { MAIN_PATH, MAPS_PATH, REGISTER_USER, TRANSPORT_PATH, USERS_PATH } from "constants/path";
import { Login } from "pages/Login";
import { UserPosition } from "redux/auth";

interface Rout {
  path: string;
  Element: React.FC;
  isAuthValue: boolean;
  userRole?: UserPosition;
}

export const routs: Rout[] = [
  {
    path: MAIN_PATH,
    Element: Login,
    isAuthValue: false,
  },
  {
    path: MAIN_PATH,
    Element: Application,
    isAuthValue: true,
  },
  {
    path: MAPS_PATH,
    Element: Maps,
    isAuthValue: true,
    userRole: "customer",
  },
  {
    path: USERS_PATH,
    Element: Users,
    isAuthValue: true,
    userRole: "dispatcher",
  },
  {
    path: TRANSPORT_PATH,
    Element: Transport,
    isAuthValue: true,
    userRole: "dispatcher",
  },
  {
    path: MAPS_PATH,
    Element: Maps,
    isAuthValue: true,
    userRole: "dispatcher",
  },
  {
    path: REGISTER_USER,
    Element: Register,
    isAuthValue: true,
    userRole: "dispatcher",
  },
];