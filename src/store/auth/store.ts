import { makeAutoObservable } from "mobx";
import {
  InternInfo,
  signinIntern,
  signupIntern,
  verifyInternOTP,
} from "api/auth";
import { ExistingUserResponse, InternAuth, InternVerify } from "api/types";
import { save } from "utils";

class AuthStore {
  public loading: boolean = false;
  public blockTimer: number | null = null;
  public codeSent: boolean = false;
  public registerToken: string | null = null;
  public accessToken: string | null = null;
  public refreshToken: string | null = null;
  // TODO: Implement types
  public user: object = {};

  constructor() {
    makeAutoObservable(this);
  }

  public loginIntern(phone: string) {
    this.loading = true;
    this.codeSent = false;
    return signinIntern(phone).then(({ data }: { data: InternAuth }) => {
      this.blockTimer = data.blockTime;
      this.codeSent = true;
    });
  }

  public verifyIntern(phone: string, code: string) {
    this.loading = true;
    return verifyInternOTP({
      phone,
      code,
    }).then(({ data }: { data: InternVerify | ExistingUserResponse }) => {
      const { registerToken } = data as InternVerify;
      if (!registerToken) {
      } else {
        this.registerToken = registerToken;
      }
      return Boolean(registerToken);
    });
  }

  public signupIntern(data: InternInfo) {
    this.loading = true;
    // TODO: Implement types
    return signupIntern(data).then(({ data }) => {
      save("accessToken", data.token.accessToken);
      save("refreshToken", data.token.refreshToken);
      this.accessToken = data.token.accessToken;
      this.refreshToken = data.token.refreshToken;
      this.user = data.intern;
    });
  }
}

export default new AuthStore();
