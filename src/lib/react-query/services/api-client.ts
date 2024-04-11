import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_LINK } from "../utility/constants";
import { devDebug } from "../utility/helpers";

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

  get = async (config: AxiosRequestConfig = {}) => {
    return axiosInstance(this.authToken)
      .get<T[]>(this.endpoint, config)
      .then((res) => {
        devDebug("api-client get response", res);
        return res;
      })
      .catch((e) => e);
  };

  getOne = (id: number | string) => {
    return axiosInstance(this.authToken)
      .get<T>(this.endpoint + "/" + id)
      .then((res) => {
        devDebug("api-client get response", res);
        return res;
      })
      .catch((e) => e);
  };

  post = (data: T) => {
    return axiosInstance(this.authToken)
      .post<T>(this.endpoint, data)
      .then((res) => {
        devDebug("api-client post response", res);
        return res;
      })
      .catch((e) => e);
  };
}

export default APIClient;
