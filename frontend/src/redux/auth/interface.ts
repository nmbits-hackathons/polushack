export type UserPosition  = "dispatcher" | "customer";

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  position: UserPosition;
}

export interface AuthState {
  user: UserState | null;
  isLoading: boolean;
  error?: string | null | unknown;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  position: string;
  password: string;
}