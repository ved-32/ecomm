import axios, { AxiosResponse } from "axios";

import { withData, withError } from "./api";

export const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((req) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    const token = user.token;
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return req;
});

http.interceptors.response.use(
  (res) => withData(res.data) as AxiosResponse<any>,
  (err) => withError(err?.response?.data?.error)
);

export function get<P>(url: string, params?: P): Promise<any> {
  return http({
    method: "get",
    url,
    params,
  });
}

export function post<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    url,
    data,
    params,
  });
}

export function postFile<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    url,
    data,
    params,
  });
}

export function put<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "put",
    url,
    data,
    params,
  });
}

export function patch<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "patch",
    url,
    data,
    params,
  });
}

export function remove<P>(url: string, params?: P): any {
  return http({
    method: "delete",
    url,
    params,
  });
}
