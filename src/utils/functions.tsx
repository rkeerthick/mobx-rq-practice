import axios from "axios";
import { IData } from "../Types";

export const fetchPosts = () => {
  const response = axios.get("http://localhost:3939/posts");
  return response;
};

export const addPost = (data: IData) => {
  const response = axios.post("http://localhost:3939/posts", data);
  return response;
};

export const deletePost = (id: string) => {
  const response = axios.delete(`http://localhost:3939/posts/${id}`);
  return response;
};

export const updatePost = async (id: number, data: IData) => {
  const response = await axios.put(`http://localhost:3939/posts/${id}`, data);
  return response;
};

export const fetchPostByID = (id: number) => {
  const response = axios.get(`http://localhost:3939/posts/${id}`);
  return response;
};
