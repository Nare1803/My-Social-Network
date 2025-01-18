import { useContext, useState } from "react";
import { AccountContext } from "../context";
import { Http } from "../../../../helpers/api";
import { IResponse } from "../../../../helpers/types";

interface IProps {
  id: number;
  liked: boolean;
  likes: number[];
}

export const LikeButton: React.FC<{ post: IProps }> = ({ post }) => {
  const context = useContext(AccountContext);

  if (!context) throw new Error("Out of provider...");

  //   const { account, refetch } = context
  const [buttonState, setButtonState] = useState(post.liked ? "unlike" : "like");
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLike = async () => {
    const newButtonState = buttonState === "like" ? "unlike" : "like";
    setButtonState(newButtonState);

    try {
      const response = await Http.post<IResponse>(`/posts/react/${post.id}`);
      if (newButtonState === "like") {
        setLikeCount(likeCount -1);
      } else {
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      
      setButtonState(buttonState);
      console.error("Error liking/unliking:", err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLike}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
          buttonState === "like"
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-red-500 hover:bg-red-400 text-white"
        }`}
      >
        <img
          src={
            buttonState === "like"
              ? "https://cdn1.iconfinder.com/data/icons/game-ui-set-part-2/96/Heart_black-512.png"
              : "https://cdn1.iconfinder.com/data/icons/game-ui-set-part-2/96/Heart_red-512.png"
          }
          alt={buttonState === "like" ? "Like" : "Unlike"}
          className="w-5 h-5"
        />
        <span className="text-sm font-semibold">
          {buttonState === "like" ? "Like" : "Unlike"}
        </span>
      </button>
      <span className="text-sm font-semibold">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </div>
  );
};
