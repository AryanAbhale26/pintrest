import React, { useState } from "react";
import "./UserButton.css";
import Image from "../Image/Image";
import { ArrowDown, ArrowDownNarrowWide, ChevronDown } from "lucide-react";
import apiRequest from "../../utils/apiRequests.js";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore.js";

const UserButton = () => {
  const { currentUser } = useAuthStore();
  console.log(currentUser);

  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      nav("/auth");
    } catch (error) {
      console.log(error);
    }
  };
  return currentUser ? (
    <div className="userButton flex flex-row items-center gap-2  ">
      <Image path="/general/noAvatar.png" alt="" />
      <ChevronDown onClick={() => setOpen((p) => !p)} className="arrow" />
      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <a href="/auth" className="loginLink">
      Login /Sign Up
    </a>
  );
};

export default UserButton;
