import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_LINK } from "../utility/constants";
import { isDev } from "../utility/helpers";

const log = (message: string, data: unknown) => {
  if (isDev()) console.debug(message, data);
};

const axiosInstance = (authToken: string) =>
  axios.create({
    baseURL: API_BASE_LINK,
    headers: {
      Authorization: authToken,
    },
  });

class APIClient<T> {
  endpoint: string;
  authToken: string;

  constructor(endpoint: string, authToken?: string) {
    this.endpoint = endpoint;
    this.authToken = authToken ? authToken : "";
  }

  getAll = async (config: AxiosRequestConfig) => {
    try {
      return axiosInstance(this.authToken)
        .get<T[]>(this.endpoint, config)
        .then((res) => {
          log("Fetched get data", res.data);
          return res.data;
        });
    } catch (e) {
      console.debug("error", e);
    }
  };

  get = (id: number | string) => {
    return axiosInstance(this.authToken)
      .get<T>(this.endpoint + "/" + id)
      .then((res) => {
        log("Fetched get data", res.data);
        return res.data;
      });
  };

  post = (data: T) => {
    return axiosInstance(this.authToken)
      .post<T>(this.endpoint, data)
      .then((res) => {
        log("Fetched post data", res.data);
        return res.data;
      });
  };
}

export default APIClient;
