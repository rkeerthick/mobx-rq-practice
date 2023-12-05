import { LoginStore } from "./LoginStore";
import { LoginUserStore } from "./LoginUserStore";
import { PostsStore } from "./PostsStore";

export class RootStore {
  postsStore: PostsStore;
  loginStore: LoginStore;
  loginUserStore: LoginUserStore

  constructor() {
    this.postsStore = new PostsStore(this);
    this.loginStore = new LoginStore(this);
    this.loginUserStore = new LoginUserStore(this);
  }
}
