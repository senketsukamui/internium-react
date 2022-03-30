import { makeAutoObservable } from "mobx";
import { signinIntern } from "api/auth";

class AuthStore {
  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public loginIntern(phone: string) {
    this.loading = true;
    return signinIntern(phone);
  }
}

export default new AuthStore();
