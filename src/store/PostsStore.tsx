import { computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";

export interface IPosts {
    data: Datum[];
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Env;
  }
  
  export interface Config {
    transitional: Transitional;
    adapter: string[];
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Env;
    headers: Headers2;
    method: string;
    url: string;
  }
  
  export interface Headers2 {
    Accept: string;
  }
  
  export interface Env {
  }
  
  export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
  }
  
  export interface Headers {
    'cache-control': string;
    'content-type': string;
    expires: string;
    pragma: string;
  }
  
  export interface Datum {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

export class PostsStore {
    posts: Datum[] = [];
    rootStore: IRootStore;

    constructor(rootStore: IRootStore) {
        makeObservable(this, {
            posts: observable,
            getPosts: computed
        })
        this.rootStore = rootStore;
    }

    setPosts(posts: []) {
        this.posts = posts;
    }

    get getPosts() {
        return this.posts;
    }
}