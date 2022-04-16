import { basicAxios, mainAxios } from "./utils";

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

export interface CompanyInvitation {
  email: string;
}

export interface CompanyInvitationVerify {
  token: string;
}

export interface CompanyUser {
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  position: string;
  birthdate: string;
  phone: string;
}

export interface CompanyAuth {
  email: string;
  password: string;
}

// Interns

export const signupInternRequest = (internInfo: InternInfo) =>
  basicAxios.post("/intern/signup", internInfo);

export const signinInternRequest = (phone: string) =>
  basicAxios.post("/intern/auth", {
    phone,
  });

export const verifyInternOTPRequest = (internOTPInfo: InternOTPInfo) =>
  basicAxios.post("/intern/verify", internOTPInfo);

// Company

export const signupCompanyRequest = (companyInfo: CompanyInfo) =>
  basicAxios.post("/company/signup", companyInfo);

// Company users

export const createCompanyInvitationRequest = (
  companyInvitation: CompanyInvitation
) => basicAxios.post("/companyInvitations", companyInvitation);

export const verifyCompanyInvitationRequest = (
  companyInvitationVerify: CompanyInvitationVerify
) =>
  mainAxios.get("/companyInvitations/verify", {
    params: companyInvitationVerify,
  });

export const createCompanyUserRequest = (companyUser: CompanyUser) =>
  basicAxios.post("/companyUsers", companyUser);

export const getCurrentCompanyUserRequest = () =>
  basicAxios.get("/companyUsers/current");

export const authorizeCurrentCompanyUserRequest = (currentUser: CompanyAuth) =>
  basicAxios.post("/companyUsers/authorize", currentUser);
