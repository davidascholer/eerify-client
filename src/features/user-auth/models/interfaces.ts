/*
  Signatures of response data from the server.
*/

import { AxiosError } from "axios";

export interface UseQueryReturnType {
  data?: any | unknown;
  status?: "loading" | "error" | "success";
  error?: null | AxiosError;
  refetch?: () => void;
}

export interface UseRefreshTokenDataType {
  access: string;
}

export interface UserPostType {
  access: string;
}

export interface UserReturnType {
  id: number;
}

export interface LoginPostType {
  email: string;
  password: string;
}

export interface LoginReturnType {
  refresh: string;
  access: string;
}
