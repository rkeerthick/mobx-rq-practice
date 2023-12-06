import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class PostStore {
  post: object[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      post: observable,
      setPost: action,
    });

    makePersistable(this, {
      name: "Post Store",
      properties: ["post"],
      storage: window.localStorage,
    });
    this.rootStore = rootStore;
  }

  setPost(data: any) {
    this.post = data;
  }
}
