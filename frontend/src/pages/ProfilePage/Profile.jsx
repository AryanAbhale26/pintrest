import React, { useState } from "react";
import Image from "../../components/Image/Image";
import { MoreHorizontal, Share } from "lucide-react";
import "./Profile.css";
import FollowButton from "./FollowButton";
import Gallery from "../../components/gallery/Gallery";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequests";
import { useParams } from "react-router";
import Boards from "../../components/Collections/Boards";

const Profile = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading......";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "User not found!";

  return (
    <div className="profilePage">
      <Image
        src={data.img || "/general/noAvatar.png"}
        alt="User Avatar"
        w={100}
        h={100}
        classname="rounded-full object-contain"
      />
      <h1>{data.displayName}</h1>
      <span>@{data.userName}</span>
      <div className="">
        {data.followerCount} followers · {data.followingCount} followings
      </div>

      <div className="profileInteractions">
        <Share />
        <div className="profileButtons">
          <FollowButton
            isFollowing={data.isFollowing}
            userName={data.userName}
          />
        </div>
        <MoreHorizontal />
      </div>

      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>

      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default Profile;
