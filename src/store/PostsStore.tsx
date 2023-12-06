import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { Datum } from "../Types";

export class PostsStore {
  posts: Datum[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      posts: observable,
      setPosts: action,
      clearData: action,
    });
    this.rootStore = rootStore;
  }

  setPosts(posts: []) {
    this.posts = posts;
  }

  clearData() {
    localStorage.clear();
  }
}
