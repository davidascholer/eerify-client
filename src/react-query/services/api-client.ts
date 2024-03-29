import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_LINK } from "../utility/constants";
import { isDev } from "../utility/helpers";

const log = (message: string, data: unknown) => {
  if (isDev()) console.debug(message, data);
};

const axiosInstance = axios.create({
  baseURL: API_BASE_LINK,
  headers: {
    Authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExNjY1Mzk0LCJpYXQiOjE3MTE1Nzg5OTQsImp0aSI6ImVkYjg0NmY2MmY2ODQ5MjI5YWUwOGFiMDMwZjExNmQ0IiwidXNlcl9pZCI6MX0.VFdTh-a-wvXuYgkxZRei91whmd_sW2WoWXGNsJ_zfCQ",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    try {
      return axiosInstance.get<T[]>(this.endpoint, config).then((res) => {
        log("Fetched get data", res.data);
        return res.data;
      });
      // const result = await axiosInstance.get<T[]>(this.endpoint, config);
      // log("Fetched getAll result", JSON.stringify(result));
      // return result.data;
    } catch (e) {
      console.debug("error", e);
      // return JSON.stringify(e);
    }
  };

  get = (id: number | string) => {
    return axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => {
      log("Fetched get data", res.data);
      return res.data;
    });
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => {
      log("Fetched post data", res.data);
      return res.data;
    });
  };
}

export default APIClient;
