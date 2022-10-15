import axios from "axios";
import { LoginDto, UserState } from "redux/auth";
import { LOGIN_API, SESSION_API } from "constants/path";
import withMock from "../withMock";

export interface LoginRequest {
  access_token: string | null;
  token_type: string | null;
}

const mockLoginRequest = {
  data: {
    access_token: "asdsadsadsa weqw",
    token_type: null,
  },
};

const isMock = process.env.IS_MOCK === "true";

const mockUser: UserState = {
  id: "test-id-1",
  name: "Semen",
  email: "asdsa@dadsa.ru",
  position: "dispatcher",
};


export const loginUserApi = async (data: LoginDto) => {
  if (isMock) return withMock(mockLoginRequest);
  return axios.post(LOGIN_API, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const sessionApi = async (token: string) => {
  if (isMock) return withMock(mockUser);
  const { data } = await axios.get(SESSION_API, {
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  return {
    email: data.email,
    id: data.id,
    name: "test",
    position: "dispatcher",
  };
};