import axios, { AxiosRequestConfig } from "axios";
import { ROOT_API, TOKEN } from "../utils/endpoints";

const axiosInstance = () =>
  axios.create({
    baseURL: ROOT_API,
    headers: {
      Authorization: TOKEN,
    },
  });
class FilmAPIClient<T> {
  filter: string;

  constructor(filter: string) {
    this.filter = filter ? filter : "";
  }

  get = async (config: AxiosRequestConfig = {}) => {
    return axiosInstance()
      .get<T[]>(this.filter, config)
      .then((res) => {
        return res;
      })
      .catch((e) => e);
  };
}

export default FilmAPIClient;
