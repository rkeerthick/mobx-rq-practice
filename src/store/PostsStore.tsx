import { computed, makeObservable, observable } from "mobx";
import { IRootStore } from "../Types/index";
import { Datum } from "../Types";

export class PostsStore {
  posts: Datum[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      posts: observable,
      getPosts: computed,
    });
    this.rootStore = rootStore;
  }

  setPosts(posts: []) {
    this.posts = posts;
  }

  get getPosts() {
    return this.posts;
  }
}
