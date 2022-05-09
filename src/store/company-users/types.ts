import { CompanyUser } from "store/auth/types";
import { CompanyModel } from "store/companies/types";

export interface CompanyUserModel {
  id: number;
  userInfo: CompanyUser;
  company: CompanyModel;
}
