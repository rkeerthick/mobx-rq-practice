import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { IPost } from "../../Types";

const PostsContainer = ({
  data,
  isLoading,
  isFetching,
  isError,
  error,
}: IPost) => {
  let result: any;

  console.log(data, "data");
  const {
    rootStore: { postsStore },
  } = useStore();
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
