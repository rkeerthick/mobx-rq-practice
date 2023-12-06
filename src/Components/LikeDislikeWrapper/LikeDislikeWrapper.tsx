import { useMutation } from "@tanstack/react-query";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { updateLikes, updatePost } from "../../utils/functions";
import useStore from "../../Hooks/UseStore";
import { useState } from "react";
import { setState } from "../../Constant/functions";
import { Datum, likeDislikeProps } from "../../Types";
import { PostStore } from "../../store/PostStore";

const LikeDislikeWrapper = ({
  id,
  isLiked,
  isDisliked,
  likeCount,
  dislikeCount,
}: likeDislikeProps) => {
  const [like, setLike] = useState(isLiked);
  const [dislike, setDislike] = useState(isDisliked);
  const {
    rootStore: { loginStore, loginUserStore, postStore },
  } = useStore();

  const userData = loginUserStore?.user;
  const postDetails = postStore?.post.find((post: any) => post.id === +id);

  const updateLikeCountMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: any) => {
      const response = updatePost(+id, data);
      return response;
    },
  });

  const handleUpdateLikeCount = async (data: any) => {
    try {
      await updateLikeCountMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const updateLikesMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: any) => {
      const response = updateLikes(loginStore?.userId, data);
      return response;
    },
  });

  const handleUpdateLikes = async (data: any) => {
    try {
      await updateLikesMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleLike = () => {
    setState(setLike, !like);
    const isContains = userData.likes.some((data: any) => data.postId === id);
    let temp: object[] = [];

    if (isContains) {
      temp = userData.likes.filter((d: any) => d.postId !== id);
      postDetails && (postDetails.likeCount -=  1);
    } else {
      temp = [...(userData.likes || []), { postId: id }];
      postDetails && (postDetails.likeCount += 1);
    }

    userData && (userData.likes = temp.slice());
    postStore.setPosts([...postStore.post, postDetails]);
    handleUpdateLikes(userData);
    handleUpdateLikeCount(postDetails);
  };

  const handleDislike = () => {
    setState(setDislike, !dislike);
    const isContains = userData.dislikes.some(
      (data: any) => data.postId === id
    );
    let temp: any[] = [];

    if (isContains) {
      temp = userData.dislikes.filter((d: any) => d.postId !== id);
      postDetails && (postDetails.dislikeCount -= 1);
    } else {
      temp = [...(userData.dislikes || []), { postId: id }];
      postDetails && (postDetails.dislikeCount += 1);
    }

    userData && (userData.dislikes = temp.slice());
    postStore.setPosts([...postStore.post, postDetails]);
    handleUpdateLikes(userData);
    handleUpdateLikeCount(postDetails)
  };

  return (
    <div className="post__container__footer">
      <div className="post__container__footer__likes" onClick={handleLike}>
        {like ? (
          <AiFillLike className="like-icon" />
        ) : (
          <AiOutlineLike className="like-icon" />
        )}
        {postDetails?.likeCount}
      </div>
      <div
        className="post__container__footer__dislikes"
        onClick={handleDislike}
      >
        {dislike ? (
          <AiFillDislike className="like-icon" />
        ) : (
          <AiOutlineDislike className="dislike-icon" />
        )}
        {postDetails?.dislikeCount}
      </div>
    </div>
  );
};

export default LikeDislikeWrapper;
