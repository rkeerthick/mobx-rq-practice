import { PostsStore } from "./PostsStore";

export interface IRootStore {
  postsStore: PostsStore;
}

export class RootStore {
  postsStore: PostsStore;

  constructor() {
    this.postsStore = new PostsStore(this);
  }
}
