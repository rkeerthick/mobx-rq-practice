import { PostsStore } from "../store/PostsStore";
import { V4Options } from "uuid";

export interface IRootStore {
  postsStore: PostsStore;
}

export interface IData {
  id: V4Options;
  userId: number;
  title: string;
  content: string;
}

export interface IPost {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: string | undefined;
}

export interface Datum {
  userId: string;
  id: string;
  title: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
}
export interface ITextarea {
  title: string;
  rows: number;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

export interface IInput {
  title?: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface IButton {
  value: string;
  buttonType?: "button" | "submit" | undefined;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type: string;
}

export interface post {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
  handleDelete?: any;
}

export interface AddUpdatePost {
  userID?: number;
}

export interface Form {
  formType: string;
}

export interface IUser {
  email: string;
  likes: object[];
  dislikes: object[];
}

export interface search {
  handleSearchText: any;
}

export interface layout {
  children: JSX.Element;
}

export interface loginUser {
  id: number;
  email: string;
  likes: object[];
  dislikes: object[];
}
export interface likeDislikeProps {
  id: string;
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
}