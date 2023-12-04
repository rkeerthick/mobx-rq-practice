import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class LoginStore {
  isMyPost: boolean = false;
  userId: number = 0;
  loginUser: string = "";
  rootStore: IRootStore;
  data: boolean = false;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      isMyPost: observable,
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


  setIsMyPost() {
    this.isMyPost = !this.isMyPost;
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
    this.isMyPost = false;
    localStorage.clear();
  }

  get getLoginUser() {
    return this.loginUser;
  }

  get getUserID() {
    return this.userId;
  }

  get getIsMyPost() {
    return this.isMyPost;
  }
}
