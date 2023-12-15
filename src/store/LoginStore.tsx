import { action, makeObservable, observable } from "mobx";
import { rootStoreProps } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class LoginStore {
  userId: number = 0;
  loginUser: string = "";
  rootStore: rootStoreProps;

  constructor(rootStore: rootStoreProps) {
    makeObservable(this, {
      userId: observable,
      loginUser: observable,
      setUserID: action,
      setLoginUser: action,
      setLogoutUser: action,
      clearData: action,
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

  clearData() {
    localStorage.clear();
  }
}
