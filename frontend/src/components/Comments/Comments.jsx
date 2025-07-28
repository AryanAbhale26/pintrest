import React, { useState } from "react";
import Image from "../Image/Image";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import apiRequest from "../../utils/apiRequests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import CommentForm from "./commentForm";

const Comments = ({ id }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  });
  if (isPending) return "Loading.......";
  if (error) return "An error Occured" + error.message;
  // const commentData = [
  //   {
  //     username: "John Cena",
  //     text: "This is a great post! Thanks for sharing.",
  //     time: "1h",
  //   },
  //   {
  //     username: "Jane Doe",
  //     text: "I totally agree with this perspective.",
  //     time: "2h",
  //   },
  //   {
  //     username: "Mike Ross",
  //     text: "Interesting take, but I think there’s more to consider.",
  //     time: "3h",
  //   },
  //   {
  //     username: "Mike Ross",
  //     text: "Interesting take, but I think there’s more to consider.",
  //     time: "3h",
  //   },
  //   {
  //     username: "Mike Ross",
  //     text: "Interesting take, but I think there’s more to consider.",
  //     time: "3h",
  //   },
  // ];

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">
          {data.length === 0 ? "No Comments" : data.length + "Comments"}{" "}
          comments
        </span>
        {data.map((comment, index) => (
          <div className="comment" key={index}>
            <Image
              src={
                comment.user?.img ||
                "http://localhost:5173/general/noAvatar.png"
              }
              w={36}
              h={36}
            />

            <div className="commentContent">
              <span className="commentUsername">
                {comment.user?.displayName ||
                  comment.user?.userName ||
                  "Unknown"}
              </span>
              <p className="commentText">{comment.description}</p>
              <span className="commentTime">{format(comment.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
