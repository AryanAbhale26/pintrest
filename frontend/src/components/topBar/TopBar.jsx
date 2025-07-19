import { Search } from "lucide-react";
import React from "react";
import UserButton from "../UserButton/UserButton";
import "./topBar.css";
import { useNavigate } from "react-router";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar px-3">
      <form onSubmit={handleSubmit} className="Search">
        <Search />
        <input type="text" placeholder="Search" />
      </form>
      {/* {user} */}
      <UserButton />
    </div>
  );
};

export default TopBar;
