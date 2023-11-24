import { PostsStore } from "./PostsStore";

export class RootStore {
  postsStore: PostsStore;

  constructor() {
    this.postsStore = new PostsStore(this);
  }
}
