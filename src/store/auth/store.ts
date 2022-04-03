import { makeAutoObservable } from "mobx";
import { signinIntern, verifyInternOTP } from "api/auth";
import { InternAuth, InternVerify } from "api/types";
import { save } from "utils";

class AuthStore {
  public loading: boolean = false;
  public blockTimer: number | null = null;
  public codeSent: boolean = false;
  public registerToken: string | null = null;

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
    }).then(({ data }: { data: InternVerify }) => {
      this.registerToken = data.registerToken;
      save("registerToken", data.registerToken);
    });
  }
}

export default new AuthStore();
