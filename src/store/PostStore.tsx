import { action, computed, makeObservable, observable } from "mobx";
import { Datum, IRootStore } from "../Types/index";
import { makePersistable } from "mobx-persist-store";

export class PostStore {
  post: Datum[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      post: observable,
      setPosts: action,
      setPost: action,
      clearData: action,
    });

    makePersistable(this, {
      name: "Post Store",
      properties: ["post"],
      storage: window.localStorage,
    });
    this.rootStore = rootStore;
  }

  setPosts(data: any) {
    this.post = data;
  }

  setPost(id: number, data: any) {
    this.post[id] = data;
  }

  clearData() {
    localStorage.clear();
  }
}
