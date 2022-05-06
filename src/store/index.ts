import { createContext } from "react";
import AuthStore from "./auth";
import VacanciesStore from "./vacancies";
import SpecializationsStore from "./specializations";
import CompaniesStore from "./companies";
import { createWrappedApiInterceptor } from "api/helpers";

(function initStore() {
  createWrappedApiInterceptor(AuthStore);
})();

export const rootStoreContext = createContext({
  authStore: AuthStore,
  vacanciesStore: VacanciesStore,
  specializationsStore: SpecializationsStore,
  companiesStore: CompaniesStore,
});
