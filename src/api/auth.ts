import { basicAxios } from "./utils";

interface InternInfo {
  firstName: string;
  lastName: string;
  middlename: string;
  birthdate: string;
  gender: boolean;
}

interface InternOTPInfo {
  code: string;
  phone: string;
}

interface CompanyInfo {
  name: string;
  email: string;
  city: string;
  phone: string;
  password: string;
}

export const signupIntern = (internInfo: InternInfo) =>
  basicAxios.post("/auth/intern/signup", internInfo);

export const signinIntern = (phone: string) =>
  basicAxios.post("/auth/intern/auth", {
    phone,
  });

export const verifyInternOTP = (internOTPInfo: InternOTPInfo) =>
  basicAxios.post("/auth/intern/verify", internOTPInfo);

export const signupCompany = (companyInfo: CompanyInfo) =>
  basicAxios.post("/auth/company/signup", companyInfo);
