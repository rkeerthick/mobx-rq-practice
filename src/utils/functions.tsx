import axios from "axios";
import { dataProps, userProps } from "../Types";
import { url } from "./urls";

export const fetchPosts = () => {
  const response = axios.get(url.get.GETPOST);
  return response;
};

export const addPost = (data: dataProps) => {
  const response = axios.post(url.post.ADDPOST, data);
  return response;
};

export const deletePost = (id: number) => {
  const response = axios.delete(`${url.delete.DELETEUSER}/${id}`);
  return response;
};

export const updatePost = async (id: number, data: dataProps) => {
  const response = await axios.put(`${url.put.UPDATEPOST}/${id}`, data);
  return response;
};

export const fetchPostByID = (id: number) => {
  const response = axios.get(`${url.get.GETPOSTBYID}/${id}`);
  return response;
};

export const addUser = (data: userProps) => {
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

export const updateLikes = (id: number, data: any) => {
  const response = axios.put(`${url.put.UPDATEUSER}/${id}`, data);
  return response;
};
