import createAuthRefreshInterceptor from "axios-auth-refresh";

import {
  refreshTokenSelector,
  accessTokenSelector,
} from "@redux/auth/selectors";
import { mainAxios, basicAxios } from "./utils";
import { logout } from "@redux/auth/slices";
import { tokens } from "@utils";

const getAccessToken = (store) => accessTokenSelector(store.getState());

export const createWrappedAuthApiInterceptor = (store) => {
  const refreshAuthLogic = (failedRequest) =>
    basicAxios()
      .post(
        "/auth/get_access",
        {
          refreshToken: refreshTokenSelector(store.getState()),
        },
        { skipAuthRefresh: true }
      )
      .then((res) => {
        tokens.localStorageSet(store, res.data);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + getAccessToken(store);
        return Promise.resolve();
      })
      .catch((e) => {
        console.error(e);
        store.dispatch(logout());
        return Promise.reject(e);
      });

  createAuthRefreshInterceptor(mainAxios, refreshAuthLogic, {
    statusCodes: [401, 403],
  });
};

export const createWrappedApiInterceptor = (store) => {
  mainAxios.interceptors.request.use((request) => {
    request.headers["Authorization"] = `Bearer ${getAccessToken(store)}`;
    return request;
  });
};
