type Nullable<T> = T | null;

export interface CompanyInfo {
  id: number;
  name: string;
  email: string;
  city: string;
  phone: string;
}

export interface CompanyUserInfo {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  position: string;
  phone: string;
  birthdate: string;
}

export interface CompanyUser {
  id: string;
  email: string;
  company: CompanyInfo;
  userInfo: CompanyUserInfo;
  role: string;
  companyId: Nullable<number>;
  userInfoId: Nullable<number>;
}

export enum TokenEntities {
  OWNER = "OWNER",
  INTERN = "intern",
  COMPANY_USER = "companyUser",
}

export enum InternStatuses {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
