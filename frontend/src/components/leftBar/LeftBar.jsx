import React from "react";
import "./leftBar.css";
import {
  Bell,
  HomeIcon,
  MessageCircleMore,
  Settings,
  SquarePen,
} from "lucide-react";
import { Link } from "react-router";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link href="/" className="menuIcon">
          <img src="/logo.svg" alt="" width={40} height={40} className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <HomeIcon />
        </Link>
        <Link to="/create" className="menuIcon">
          <SquarePen />
        </Link>
        <Link to="/" className="menuIcon">
          <Bell />
        </Link>
        <Link to="/" className="menuIcon">
          <MessageCircleMore />
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <Settings />
      </Link>
    </div>
  );
};

export default LeftBar;
