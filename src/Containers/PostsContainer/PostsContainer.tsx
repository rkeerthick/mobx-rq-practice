import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";

export interface IPost {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
}

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
