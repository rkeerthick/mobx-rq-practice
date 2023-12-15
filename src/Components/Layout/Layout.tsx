import { useState } from "react";
import Header from "../../Containers/Header/Header";
import Sidebar from "../../Containers/SideBar/Sidebar";
import useStore from "../../Hooks/UseStore";
import { layoutProps } from "../../Types";
import "./Layout.scss";

const Layout = ({ children }: layoutProps) => {
  const {
    rootStore: { loginStore },
  } = useStore();
  return (
    <div className="grid-container">
      <div className="header-layout">
        <Header />
      </div>
      <div className="sidebar-layout">
        <Sidebar />
      </div>

      <div className="main-layout">{children}</div>
    </div>
  );
};

export default Layout;
