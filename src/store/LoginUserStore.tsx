import { action, makeObservable, observable } from "mobx";
import { rootStoreProps, loginUserProps } from "../Types/index";
import { makePersistable } from "mobx-persist-store";


export class LoginUserStore {
  isMyPost: string = "all posts";
  user: loginUserProps = {
    id: 0,
    email: "",
    likes: [],
    dislikes: [],
  };
  rootStore: rootStoreProps;

  constructor(rootStore: rootStoreProps) {
    makeObservable(this, {
      user: observable,
      isMyPost: observable,
      setIsMyPost: action,
      setUser: action,
      clearData: action,
    });

    makePersistable(this, {
      name: "LoginUserStore",
      properties: ["user"],
      storage: window.localStorage,
    });
    this.rootStore = rootStore;
  }

  setIsMyPost(data: string) {
    this.isMyPost = data;
  }

  setUser(userData: loginUserProps) {
    this.user = userData;
  }

  clearData() {
    localStorage.clear();
  }
}
