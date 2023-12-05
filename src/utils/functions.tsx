import axios from "axios";
import { IData, IUser } from "../Types";
import { url } from "./urls";

export const fetchPosts = () => {
  const response = axios.get(url.get.GETPOST);
  return response;
};

export const addPost = (data: IData) => {
  const response = axios.post(url.post.ADDPOST, data);
  return response;
};

export const deletePost = (id: number) => {
  const response = axios.delete(`${url.delete.DELETEUSER}/${id}`);
  return response;
};

export const updatePost = async (id: number, data: IData) => {
  const response = await axios.put(`${url.put.UPDATEPOST}/${id}`, data);
  return response;
};

export const fetchPostByID = (id: number) => {
  console.log(id,"id")
  const response = axios.get(`${url.get.GETPOSTBYID}/${id}`);
  return response;
};

export const addUser = (data: IUser) => {
  const response = axios.post(url.post.ADDUSER, data);
  return response;
};

export const fetchUsers = () => {
  const response = axios.get(url.get.GETUSER);
  return response;
};

export const fetchUsersByEmail = (email: string) => {
  const response = axios.get(`${url.get.GETUSERSBYEMAIL}=${email}`);
  return response;
};

export const updateLikes = (id: any, data: any) => {
  const response = axios.put(`${url.put.UPDATEUSER}/${id}`, data);
  return response;
};
