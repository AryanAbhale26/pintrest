import React from "react";
import "./PostInteraction.css";
import {
  Heart,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Share,
} from "lucide-react";

const PostInteraction = () => {
  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <div className="flex gap-1 items-center justify-center">
          <Heart className="cursor-pointer" />
          220
        </div>
        <Share className="cursor-pointer" />
        <MoreHorizontalIcon className="cursor-pointer" />
      </div>
      <button className="bg-red-500 py-2 rounded-full cursor-pointer w-[60px] h-[40px] text-white font-bold hover:bg-red-800 ">
        Save
      </button>
    </div>
  );
};

export default PostInteraction;
