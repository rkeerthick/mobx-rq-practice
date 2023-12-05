import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { fetchUsersByEmail, updateLikes } from "../../utils/functions";
import useStore from "../../Hooks/UseStore";
import { useState } from "react";
import { setState } from "../../Constant/functions";

const LikeDislikeWrapper = ({ id, isLiked, userData }: any) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    // const handleIsLiked = () => {
    //     setLike(prev => !prev)
    // }
    // const handleIsDisliked = () => {
    //     setDislike(prev => !prev);
    // }
  const {
    rootStore: { loginStore, loginUserStore },
  } = useStore();

    // const userData = loginUserStore?.getUser
  

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
    const isContains = userData?.data[0]?.likes.some(
      (data: any) => data.postId === id
    );
    let temp: any[] = [];

    if (isContains) {
      temp = userData?.data[0]?.likes.filter((d: any) => d.postId !== id);
    } else {
      temp = [...(userData?.data[0]?.likes || []), { postId: id }];
    }

    // debugger;
      userData?.data[0] && (userData.data[0].likes = temp.slice());
    handleUpdateLikes(userData?.data[0]);
  };

  const handleDislike = (e: any) => {
    e.preventDefault();
    setState(setDislike, !dislike);
    const isContains = userData?.data[0]?.dislikes.some(
      (data: any) => data.postId === id
    );
    let temp: any[] = [];

    if (isContains) {
      temp = userData?.data[0]?.dislikes.filter((d: any) => d.postId !== id);
    } else {
      temp = [...(userData?.data[0]?.dislikes || []), { postId: id }];
    }

    userData?.data[0] && (userData.data[0].dislikes = temp.slice());
    handleUpdateLikes(userData?.data[0]);
  };

  return (
    <div className="post__container__footer">
      <div className="post__container__footer__likes" onClick={handleLike}>
        {(isLiked || like) ? (
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
