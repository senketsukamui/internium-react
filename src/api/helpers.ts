import { mainAxios, basicAxios } from "./utils";

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

export const createWrappedApiInterceptor = (store: any) => {
  // TODO: Implement types
  basicAxios.interceptors.request.use((request: any) => {
    let tokenHeaders = `Bearer ${store.accessToken}`;
    console.log(request);
    if (request.url === "/interns/signup") {
      tokenHeaders = store.registerToken;
    }

    if (request.url !== "/company-users") {
      request.headers["Authorization"] = tokenHeaders;
    }

    return request;
  });
};
