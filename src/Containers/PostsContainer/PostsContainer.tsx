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
  const {
    rootStore: { postsStore, loginStore },
  } = useStore();
  postsStore.setPosts(data);
  let result = data;
  if (loginStore?.getUserID > 0) {
    result = data?.filter((d: any) => d.userId !== loginStore?.getUserID);
  }
  console.log(result, "resulst");
  if (isLoading || isFetching) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="posts-container">
      {
        map(result, (post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
          />
        ))
      }
    </div>
  );
};

export default PostsContainer;
