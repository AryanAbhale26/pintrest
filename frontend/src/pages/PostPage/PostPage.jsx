import React from "react";
import "./PostPage.css";
import Image from "../../components/Image/Image";
import PostInteraction from "../../components/postInteraction/PostInteraction";
import { Link, useParams, useNavigate } from "react-router";
import Comments from "../../components/Comments/Comments";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequests";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return "Loading......";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "Pin not found!";

  console.log(data);

  return (
    <div className="postPage">
      <ArrowLeft
        height="20"
        width="20"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)} // go back
      />

      <div className="postContainer">
        <div className="postImg">
          <Image path={data.media} alt="" w={736} />
        </div>
        <div className="postDetails">
          <PostInteraction postId={id} />
          <Link to={`/${data.user.userName}`} className="postUser">
            <Image path={data.user.img || "/general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
