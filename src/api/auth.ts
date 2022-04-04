import { basicAxios } from "./utils";

export interface InternInfo {
  firstName: string;
  lastName: string;
  middlename: string;
  birthdate: string;
  gender: boolean;
}

export interface InternOTPInfo {
  code: string;
  phone: string;
}

export interface CompanyInfo {
  name: string;
  email: string;
  city: string;
  phone: string;
  password: string;
}

export const signupIntern = (internInfo: InternInfo) =>
  basicAxios.post("/intern/signup", internInfo);

export const signinIntern = (phone: string) =>
  basicAxios.post("/intern/auth", {
    phone,
  });

export const verifyInternOTP = (internOTPInfo: InternOTPInfo) =>
  basicAxios.post("/intern/verify", internOTPInfo);

export const signupCompany = (companyInfo: CompanyInfo) =>
  basicAxios.post("/company/signup", companyInfo);
