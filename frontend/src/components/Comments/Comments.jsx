import React, { useState } from "react";
import Image from "../Image/Image";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import apiRequest from "../../utils/apiRequests";
import { useQuery } from "@tanstack/react-query";

const Comments = () => {
  const [showPicker, setShowPicker] = useState(false);
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["boards", userId],
  //   queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  // });
  // if (isPending) return "Loading.......";
  // if (error) return "An error Occured" + error.message;
  // console.log(data);
  const commentData = [
    {
      username: "John Cena",
      text: "This is a great post! Thanks for sharing.",
      time: "1h",
    },
    {
      username: "Jane Doe",
      text: "I totally agree with this perspective.",
      time: "2h",
    },
    {
      username: "Mike Ross",
      text: "Interesting take, but I think there’s more to consider.",
      time: "3h",
    },
    {
      username: "Mike Ross",
      text: "Interesting take, but I think there’s more to consider.",
      time: "3h",
    },
    {
      username: "Mike Ross",
      text: "Interesting take, but I think there’s more to consider.",
      time: "3h",
    },
  ];

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">{commentData.length} comments</span>
        {commentData.map((comment, index) => (
          <div className="comment" key={index}>
            <Image path="/general/noAvatar.png" w={36} h={36} />
            <div className="commentContent">
              <span className="commentUsername">{comment.username}</span>
              <p className="commentText">{comment.text}</p>
              <span className="commentTime">{comment.time}</span>
            </div>
          </div>
        ))}
      </div>
      <form className="commentForm">
        <input type="text" placeholder="Add comment" />
        <div className="emojiContainer">
          <div className="emoji" onClick={() => setShowPicker((prev) => !prev)}>
            😀
          </div>
          {showPicker && (
            <div className="emojiPicker">
              <EmojiPicker />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Comments;
