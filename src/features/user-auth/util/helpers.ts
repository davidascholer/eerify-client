import { AxiosResponse } from "axios";

export const devDebug = (message: string, data: unknown) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    console.debug("USER-AUTH", message, JSON.stringify(data));
};

const formatFromServer = (data: string) => {
  return data.replace(/[".*+?^${}()|[\]\\]/g, "").replace(/^(.*?):/, "");
};

export const serverErrorValidated = (data: string | unknown): string => {
  const messageError: string | unknown = JSON.stringify(data);
  return typeof messageError === "string"
    ? formatFromServer(messageError)
    : "error";
};

export const handleServerResponse = (response: AxiosResponse) => {
  devDebug("handleServerResponse", response);
  // Any 20x status code is acceptable
  if (response.status >= 200 && response.status < 209) {
    return { success: true, data: response.data, error: "" };
  } else {
    // response object may not exactly match an AxiosResponse response object
    return {
      success: false,
      data: {},
      error: serverErrorValidated((response as any)?.response?.data),
    };
  }
};
