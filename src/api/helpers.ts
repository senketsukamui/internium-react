import createAuthRefreshInterceptor from "axios-auth-refresh";

import {
  refreshTokenSelector,
  accessTokenSelector,
} from "@redux/auth/selectors";
import { mainAxios, basicAxios } from "./utils";
import { tokens } from "@utils";

const getAccessToken = (store) => store.accessToken;

// export const createWrappedAuthApiInterceptor = (store) => {
//   const refreshAuthLogic = (failedRequest) =>
//     basicAxios()
//       .post(
//         "/auth/get_access",
//         {
//           refreshToken: refreshTokenSelector(store.getState()),
//         },
//         { skipAuthRefresh: true }
//       )
//       .then((res) => {
//         tokens.localStorageSet(store, res.data);
//         failedRequest.response.config.headers["Authorization"] =
//           "Bearer " + getAccessToken(store);
//         return Promise.resolve();
//       })
//       .catch((e) => {
//         console.error(e);
//         store.dispatch(logout());
//         return Promise.reject(e);
//       });

//   createAuthRefreshInterceptor(mainAxios, refreshAuthLogic, {
//     statusCodes: [401, 403],
//   });
// };

export const createWrappedApiInterceptor = (store) => {
  basicAxios.interceptors.request.use((request) => {
    const currentToken = store.accessToken || store.registerToken;
    request.headers["Authorization"] = `${currentToken}`;
    return request;
  });
};
