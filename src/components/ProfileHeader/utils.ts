import { RegisteredIntern } from "api/types";
import { get } from "lodash";
import { CompanyUser } from "store/auth/types";

export const getHeaderName = (user: RegisteredIntern | CompanyUser) => {
  if (get(user, "role")) {
    if (get(user, "userInfo")) {
      const { userInfo } = user as CompanyUser;
      return `${userInfo.firstName} ${userInfo.lastName}`;
    } else {
      const { company } = user as CompanyUser;
      return company.name;
    }
  } else {
    const intern = user as RegisteredIntern;
    return `${intern.firstName} ${intern.lastName}`;
  }
};
