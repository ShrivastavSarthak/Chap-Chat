import { AxiosError } from "axios";
import api from "./api";

export enum apiMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
}

export interface GetFetchInterface<T = unknown> {
  method: apiMethod;
  url: string;
  body?: T;
}

export const apiFetch = async (data: GetFetchInterface) => {
  try {
    let res;

    switch (data.method) {
      case apiMethod.GET:
        res = await api.get(data.url);
        break;
      case apiMethod.POST:
        res = await api.post(data.url, data.body);
        break;
      case apiMethod.DELETE:
        res = await api.delete(data.url);
        break;
      case apiMethod.PATCH:
        res = await api.patch(data.url, data.body);
        break;
      case apiMethod.PUT:
        res = await api.put(data.url, data.body);
        break;
    }

    return {
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    const error = err as AxiosError<any>;

    return {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message:
        error.response?.data?.message || error.message || "Unknown error",
      error: true,
    };
  }
};
