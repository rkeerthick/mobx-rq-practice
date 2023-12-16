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
  data: userContentDetailProps[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: string | undefined;
}

export interface userContentDetailProps {
  userId: number;
  id: number;
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
  id: number;
  title: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
  handleDelete?: (id: number) => void;
  handleEdit: (id: number) => void;
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
  handleSearchText: (data: string) => void;
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
  id: number;
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
  cancelDelete: () => void;
  toggleDelete: () => void;
  handleDelete: (id: number) => void;
}

export interface editPopupProps {
  cancelEdit: () => void;
  acceptEdit: () => void;
}

export interface likeProps {
  postId: number;
}

export interface dislikeProps {
  postId: number
}