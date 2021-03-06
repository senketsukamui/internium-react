export interface InternAuth {
  blockTime: number;
  code: string;
}

export interface InternVerify {
  registerToken: string;
}

export interface JWTTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisteredIntern {
  avatar: string | null;
  birthdate: string;
  createdAt: string;
  description: string | null;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: boolean;
  id: number;
  location: string | null;
  phone: string;
  // TODO: Implement statuses enum
  status: string;
  updatedAt: string;
}

export interface ExistingUserResponse {
  token: JWTTokenResponse;
  intern: RegisteredIntern;
}

export interface CompanyUpdateInterface {
  city: string;
  description: string;
  shortDescription: string;
  hidden: boolean;
  website: string;
}

export interface CompanyUserUpdateInterface {
  firstName: string;
  lastName: string;
  middleName: string;
  position: string;
  phone: string;
  birthdate: string;
}

export interface CompanyInvitationResponse {
  success: boolean;
}

export interface VacancyInvitation {
  vacancyid: number;
  internId: number;
  message: string;
}
