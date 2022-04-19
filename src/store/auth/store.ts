import { makeAutoObservable, toJS } from "mobx";
import {
  authorizeCurrentCompanyUserRequest,
  CompanyAuth,
  CompanyInfo,
  CompanyInvitationVerify,
  CompanyUser,
  createCompanyInvitationRequest,
  createCompanyUserRequest,
  getCurrentCompanyUserRequest,
  InternInfo,
  signinInternRequest,
  signupCompanyRequest,
  signupInternRequest,
  verifyCompanyInvitationRequest,
  verifyInternOTPRequest,
} from "api/auth";
import {
  CompanyInvitationResponse,
  ExistingUserResponse,
  InternAuth,
  InternVerify,
  JWTTokenResponse,
  RegisteredIntern,
} from "api/types";
import { save, load } from "utils";
import { RegisterTypes } from "pages/Auth/constants";

class AuthStore {
  public loading: boolean = false;
  public blockTimer: number | null = null;
  public codeSent: boolean = false;
  public registerToken: string | null = null;
  public accessToken: string | null = load("accessToken") || null;
  public refreshToken: string | null = load("refreshToken") || null;
  public user: RegisteredIntern | null = null;
  public userTypes: RegisterTypes | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // TODO: Find a better solution for getting objects
  get getUserObject() {
    return toJS(this.user);
  }

  public loginIntern(phone: string) {
    this.loading = true;
    this.codeSent = false;
    return signinInternRequest(phone).then(({ data }: { data: InternAuth }) => {
      this.blockTimer = data.blockTime;
      this.codeSent = true;
    });
  }

  public verifyIntern(phone: string, code: string) {
    this.loading = true;
    return verifyInternOTPRequest({
      phone,
      code,
    }).then(({ data }: { data: InternVerify | ExistingUserResponse }) => {
      const { registerToken } = data as InternVerify;
      if (!registerToken) {
        const { intern } = data as ExistingUserResponse;
        this.user = intern;
      } else {
        this.registerToken = registerToken;
      }
      return !Boolean(registerToken);
    });
  }

  public signupIntern(data: InternInfo) {
    this.loading = true;
    return signupInternRequest(data).then(
      ({ data }: { data: ExistingUserResponse }) => {
        save("accessToken", data.token.accessToken);
        save("refreshToken", data.token.refreshToken);
        this.accessToken = data.token.accessToken;
        this.refreshToken = data.token.refreshToken;
        this.user = data.intern;
      }
    );
  }

  public signupCompany(data: CompanyInfo) {
    this.loading = true;
    return signupCompanyRequest(data).then(() => {
      this.loading = false;
    });
  }

  public createCompanyInvitation(email: string) {
    this.loading = true;
    // TODO: Deal with action and types

    return createCompanyInvitationRequest({ email }).then(
      ({ data }: { data: CompanyInvitationResponse }) => {
        this.loading = false;
      }
    );
  }

  public getCurrentCompanyUser() {
    this.loading = true;
    // TODO: Deal with action and types
    return getCurrentCompanyUserRequest().then((data: any) => {
      this.loading = false;
      console.log(data);
    });
  }

  public verifyCompanyInvitation(data: CompanyInvitationVerify) {
    this.loading = true;
    // TODO: Deal with action and types
    return verifyCompanyInvitationRequest(data).then((data: any) => {
      this.loading = false;
    });
  }

  public createCompanyUser(data: CompanyUser) {
    this.loading = true;
    // TODO: Deal with action and types
    return createCompanyUserRequest(data).then((data: any) => {
      this.loading = false;
    });
  }

  public authorizeCompanyUser(data: CompanyAuth) {
    this.loading = true;
    // TODO: Deal with action and types
    return authorizeCurrentCompanyUserRequest(data).then(
      ({ data }: { data: JWTTokenResponse }) => {
        console.log(data);
        this.loading = false;
        save("accessToken", data.accessToken);
        save("refreshToken", data.refreshToken);
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
      }
    );
  }
}

export default new AuthStore();
