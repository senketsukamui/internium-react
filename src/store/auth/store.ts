import { makeAutoObservable } from "mobx";
import { signinIntern } from "api/auth";

class AuthStore {
  public loading: boolean = false;
  public blockTimer: number | null = null;
  public codeSent: boolean = false;

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
}

export default new AuthStore();
