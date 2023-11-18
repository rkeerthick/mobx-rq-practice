import axios from "axios";

export const fetchPosts = () => {
  const response = axios.get("https://jsonplaceholder.typicode.com/posts");
  return response;
};

export const addPost = (data: {}) => {
  const response = axios.post("https://jsonplaceholder.typicode.com/posts", data);
  return response;
};

export const fetchPostByID = (id: number) => {
  const response = axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response;
};
