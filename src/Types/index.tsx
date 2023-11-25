import { PostsStore } from "../store/PostsStore";
import { V4Options } from "uuid";

export interface IRootStore {
  postsStore: PostsStore;
}

export interface IData {
  id: V4Options;
  title: string;
  content: string;
}

export interface IPost {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
}

export interface Datum {
  userId: any;
  id: string;
  title: string;
  content: string;
}
export interface ITextarea {
  title: string;
  rows: number;
  placeholder: string;
  value: string;
  onChange: any;
}

export interface IInput {
  title?: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: any;
}

export interface IButton {
  value: string;
  buttonType?: "button" | "submit" | undefined;
  handleClick?: any;
  type: string;
}

export interface post {
  id: string;
  title: string;
  content: string;
}

export interface AddUpdatePost {
  id: number;
}

export interface Form {
  formType: string;
}

export interface IUser {
  id: V4Options;
  email: string;
}
