import { LoginStore } from "./LoginStore";
import { LoginUserStore } from "./LoginUserStore";
import { PostStore } from "./PostStore";
import { PostsStore } from "./PostsStore";

export class RootStore {
  postsStore: PostsStore;
  loginStore: LoginStore;
  loginUserStore: LoginUserStore;
  postStore: PostStore;

  constructor() {
    this.postsStore = new PostsStore(this);
    this.loginStore = new LoginStore(this);
    this.loginUserStore = new LoginUserStore(this);
    this.postStore = new PostStore(this);
  }
}
