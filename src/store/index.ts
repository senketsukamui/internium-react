import { createContext } from "react";
import AuthStore from "./auth";
import { createWrappedApiInterceptor } from "api/helpers";

(function initStore() {
  createWrappedApiInterceptor(AuthStore);
})();

export const rootStoreContext = createContext({
  authStore: AuthStore,
});
