import React from "react";
import Image from "../Image/Image";
import "./Boards.css";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequests";
import { format } from "timeago.js";
import { Link } from "react-router";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading......";
  if (error) return "An error has occurred: " + error.message;
  if (!data || data.length === 0) return "No boards found!";

  return (
    <div className="Boards">
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image src={board.firstPin?.media} />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins . {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
