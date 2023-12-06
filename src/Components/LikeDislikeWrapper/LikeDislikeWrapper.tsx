import { useMutation } from "@tanstack/react-query";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { updateLikes } from "../../utils/functions";
import useStore from "../../Hooks/UseStore";
import { useState } from "react";
import { setState } from "../../Constant/functions";

const LikeDislikeWrapper = ({ id, isLiked, isDisliked }: any) => {
  const [like, setLike] = useState(isLiked);
  const [dislike, setDislike] = useState(isDisliked);
  const {
    rootStore: { loginStore, loginUserStore },
  } = useStore();

  const userData = loginUserStore?.getUser;

  const updateMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: any) => {
      const response = updateLikes(loginStore.getUserID, data);
      return response;
    },
  });

  const handleUpdateLikes = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleLike = () => {
    setState(setLike, !like);
    const isContains = userData.likes.some(
      (data: any) => data.postId === id
    );
    let temp: object[] = [];

    if (isContains) {
      temp = userData.likes.filter((d: any) => d.postId !== id);
    } else {
      temp = [...(userData.likes || []), { postId: id }];
    }

    userData && (userData.likes = temp.slice());
    handleUpdateLikes(userData);
  };

  const handleDislike = (e: any) => {
    setState(setDislike, !dislike);
    const isContains = userData.dislikes.some(
      (data: any) => data.postId === id
    );
    let temp: any[] = [];

    if (isContains) {
      temp = userData.dislikes.filter((d: any) => d.postId !== id);
    } else {
      temp = [...(userData.dislikes || []), { postId: id }];
    }

    userData && (userData.dislikes = temp.slice());
    handleUpdateLikes(userData);
  };

  return (
    <div className="post__container__footer">
      <div className="post__container__footer__likes" onClick={handleLike}>
        {(like) ? (
          <AiFillLike className="like-icon" />
        ) : (
          <AiOutlineLike className="like-icon" />
        )}
        {1}
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
        {2}
      </div>
    </div>
  );
};

export default LikeDislikeWrapper;
