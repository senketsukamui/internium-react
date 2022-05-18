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
  password: string;
  tin: string;
}

export interface CompanyInvitation {
  email: string;
}

export interface CompanyInvitationVerify {
  token: string;
}

export interface CompanyUserRequest {
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
  basicAxios.post("/interns/signup", internInfo);

export const signinInternRequest = (phone: string) =>
  basicAxios.post("/interns/auth", {
    phone,
  });

export const verifyInternOTPRequest = (internOTPInfo: InternOTPInfo) =>
  basicAxios.post("/interns/verify", internOTPInfo);

export const getCurrentInternRequest = () => basicAxios.get("/interns/current");

// Company

export const signupCompanyRequest = (companyInfo: CompanyInfo) =>
  basicAxios.post("/companies/signup", companyInfo);

// Company users

export const createCompanyInvitationRequest = (
  companyInvitation: CompanyInvitation
) => basicAxios.post("/company-invitations", companyInvitation);

export const verifyCompanyInvitationRequest = (
  companyInvitationVerify: CompanyInvitationVerify
) =>
  mainAxios.get("/company-invitations/verify", {
    params: companyInvitationVerify,
  });

export const createCompanyUserRequest = (
  companyUser: CompanyUserRequest,
  verifiedToken: string
) =>
  basicAxios.post("/company-users", companyUser, {
    headers: {
      Authorization: verifiedToken,
    },
  });

export const getCurrentCompanyUserRequest = () =>
  basicAxios.get("/company-users/current");

export const authorizeCurrentCompanyUserRequest = (currentUser: CompanyAuth) =>
  basicAxios.post("/company-users/authorize", currentUser);

export const removeAvatarRequest = () => basicAxios.delete("/avatars");

export const addAvatarRequest = (formData: FormData) =>
  basicAxios.post("/avatars", formData);
