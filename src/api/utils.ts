import * as axios from "axios";
import querystring from "query-string";

const defaultHeaders = {};

const baseURL = "https://internium.monkeyhackers.org/api";

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okOnly = (status: number) => status === 200;

export const basicAxios = axios.create({
  baseURL,
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
});

export const mainAxios = axios.create({
  baseURL,
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
  paramsSerializer: (params: Record<string, string>) =>
    querystring.stringify(params),
});
