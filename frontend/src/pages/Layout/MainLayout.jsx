import React from "react";
import LeftBar from "../../components/leftBar/LeftBar";
import TopBar from "../../components/topBar/TopBar";

import "./app.css";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <div className="app w-[97%] h-full flex gap-[16px]">
        <LeftBar />
        <div className="content w-full">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
