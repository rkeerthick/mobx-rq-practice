import { PostsStore } from "../store/PostsStore";
import { V4Options } from "uuid";

export interface rootStoreProps {
  postsStore: PostsStore;
}

export interface dataProps {
  id: V4Options;
  userId: number;
  title: string;
  content: string;
}

export interface postProps {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: string | undefined;
}

export interface userContentDetailProps {
  userId: string;
  id: string;
  title: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
}
export interface textAreaProps {
  title: string;
  rows: number;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

export interface inputProps {
  title?: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface buttonProps {
  value: string;
  buttonType?: "button" | "submit" | undefined;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type: string;
}

export interface postDetailProps {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
  handleDelete?: any;
  handleEdit: any;
}

export interface addUpdatePostProps {
  userID?: number;
}

export interface formProps {
  formType: string;
}

export interface userProps {
  email: string;
  likes: object[];
  dislikes: object[];
}

export interface searchProps {
  handleSearchText: any;
}

export interface layoutProps {
  children: JSX.Element;
}

export interface loginUserProps {
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

export interface modalProps {
  type: "danger" | "warning";
  isOpen: boolean;
  children: JSX.Element;
}

export interface deletePopupProps {
  id: number;
  cancelDelete: any;
  handleDelete: any;
}

export interface editPopupProps {
  cancelEdit: any;
  acceptEdit: any;
}
