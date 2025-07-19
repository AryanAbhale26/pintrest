import React, { useState } from "react";
import "./UserButton.css";
import Image from "../Image/Image";
import { ArrowDown, ArrowDownNarrowWide, ChevronDown } from "lucide-react";

const UserButton = () => {
  const currentUser = true;
  const [open, setOpen] = useState(false);

  return currentUser ? (
    <div className="userButton flex flex-row items-center gap-2  ">
      <Image path="/general/noAvatar.png" alt="" />
      <ChevronDown onClick={() => setOpen((p) => !p)} className="arrow" />
      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Setting</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <a href="/" className="loginLink">
      Login /Sign Up
    </a>
  );
};

export default UserButton;
