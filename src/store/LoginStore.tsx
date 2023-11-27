import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class LoginStore {
  userId: number = 0;
  loginUser: string = "";
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      userId: observable,
      loginUser: observable,
      setLogoutUser: action,
      getLoginUser: computed,
    });

    makePersistable(this, {
      name: "LoginStore",
      properties: ["loginUser", "userId"],
      storage: window.localStorage,
    });
    this.rootStore = rootStore;
  }

  setUserID(userId: number) {
    this.userId = userId;
  }

  setLoginUser(loginUser: string) {
    this.loginUser = loginUser;
  }

  setLogoutUser() {
    this.loginUser = "";
    this.userId = 0;
  }

  get getLoginUser() {
    return this.loginUser;
  }

  get getUserID() {
    return this.userId;
  }
}
