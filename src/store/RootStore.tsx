import { LoginStore } from "./LoginStore";
import { PostsStore } from "./PostsStore";
import { useState } from "react";

export class RootStore {
  postsStore: PostsStore;
  loginStore: LoginStore;

  constructor() {
    this.postsStore = new PostsStore(this);
    this.loginStore = new LoginStore(this);
  }
}
