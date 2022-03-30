import { createContext } from "react";
import AuthStore from "./auth";

export const rootStoreContext = createContext({
  authStore: AuthStore,
});
