import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import UseGetPosts from "../../Hooks/useGetPosts";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { useEffect, useState } from "react";

export interface IPost {
  data: any,
  isLoading: boolean, 
  isFetching: boolean,
  isError: boolean, 
  error: unknown
}

const PostsContainer = ({data, isLoading, isFetching, isError, error}: IPost) => {
  let result: any;
  const [reload, setReload] = useState(false);

  console.log(data, 'data')

  result = UseGetPosts();
  console.log(result, "response");
  const {
    rootStore: { postsStore },
  } = useStore();
  // postsStore.setPosts(result?.data?.data);
  debugger;
  postsStore.setPosts(data);
  if (isLoading || isFetching) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="posts-container">
      {map(postsStore.getPosts, (post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
