import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import UseGetPosts from "../../Hooks/useGetPosts";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { useEffect, useState } from "react";

const PostsContainer = () => {
  let result: any;
  const [reload, setReload] = useState(false)
  
  const handleReload = () => {
    setReload(prev => !prev)
  }
  result = UseGetPosts();
  console.log(result, 'response')
  const {
    rootStore: { postsStore },
  } = useStore();
  postsStore.setPosts(result?.data?.data);
  if (result?.isLoading || result?.isFetching) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="posts-container">
      {map(postsStore.getPosts, (post) => (
        <Post key={post.id} id={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default PostsContainer;
