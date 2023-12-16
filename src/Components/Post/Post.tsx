import "./Post.scss";
import Button from "../Button/Button";
import { postDetailProps } from "../../Types";
import useStore from "../../Hooks/UseStore";
import LikeDislikeWrapper from "../LikeDislikeWrapper/LikeDislikeWrapper";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const Post = observer(
  ({
    id,
    title,
    content,
    likeCount,
    dislikeCount,
    handleDelete,
    handleEdit,
  }: postDetailProps) => {
    const {
      rootStore: { loginStore, loginUserStore },
    } = useStore();

    const userData = loginUserStore?.user;
    const isliked = userData.likes.some((data: any) => {  return id === +data.postId });
    console.log(toJS(userData.likes), isliked, 'like')
    const isdisliked = userData.dislikes.some(
      (data: any) => id === data.postId
    );

    const handleDeletePost = (id: number) => {
      handleDelete && handleDelete(id);
    };

    const handleEditPost = (id: number) => {
      handleEdit(id);
    };

    return (
      <div className="post">
        <div className="post__container">
          <div className="post__container__header">
            {loginUserStore?.isMyPost === "my posts" &&
              loginStore?.userId > 0 && (
                <>
                  <Button
                    value="Edit"
                    buttonType="button"
                    handleClick={() => handleEditPost(id)}
                    type="primary"
                  />

                  <Button
                    value="Delete"
                    buttonType="button"
                    handleClick={() => handleDeletePost(id)}
                    type="primary"
                  />
                </>
              )}
          </div>
          <h2>{title}</h2>
          <h4>{content}</h4>
          <LikeDislikeWrapper
            id={id}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            isDisliked={isdisliked}
            isLiked={isliked}
          />
        </div>
      </div>
    );
  }
);

export default Post;
