import { action, computed, makeObservable, observable } from "mobx";
import { rootStoreProps } from "../Types/index";
import { userContentDetailProps } from "../Types";

export class PostsStore {
  posts: userContentDetailProps[] = [];
  rootStore: rootStoreProps;

  constructor(rootStore: rootStoreProps) {
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
