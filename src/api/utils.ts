import * as axios from "axios";
import querystring from "query-string";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
};

export const baseURL = "https://internium.monkeyhackers.org";

export const apiURL = `${baseURL}/api`;

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okOnly = (status: number) => status === 200;

export const basicAxios = axios.create({
  baseURL: apiURL,
  headers: defaultBodyHeaders,
});

export const mainAxios = axios.create({
  baseURL: apiURL,
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
  paramsSerializer: (params: Record<string, string>) =>
    querystring.stringify(params),
});
