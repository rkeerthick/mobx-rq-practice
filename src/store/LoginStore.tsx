import { computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";

export class LoginStore {
  loginUser: string = "";
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      loginUser: observable,
      getLoginUser: computed,
    });
    this.rootStore = rootStore;
  }

  setLoginUser(loginUser: string) {
    this.loginUser = loginUser;
  }

  get getLoginUser() {
    return this.loginUser;
  }
}
