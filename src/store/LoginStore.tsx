import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class LoginStore {
  loginUser: string = "";
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      loginUser: observable,
      setLogoutUser: action,
      getLoginUser: computed,
    });

    makePersistable(this, {
      name: "LoginStore",
      properties: ["loginUser"],
      storage: window.localStorage,
    });

    this.rootStore = rootStore;
  }

  setLoginUser(loginUser: string) {
    this.loginUser = loginUser;
  }

  setLogoutUser() {
    this.loginUser = "";
  }

  get getLoginUser() {
    return this.loginUser;
  }
}
