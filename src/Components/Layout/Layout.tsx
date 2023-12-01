import Header from "../../Containers/Header/Header";
import Sidebar from "../../Containers/SideBar/Sidebar";
import { layout } from "../../Types";
import "./Layout.scss";

const Layout = ({ children }: layout) => {
  return (
    <div className="grid-container">
      <div className="header-layout">
        <Header />
      </div>
      <div className="sidebar-layout"><Sidebar /></div>
      <div className="main-layout">{children}</div>
    </div>
  );
};

export default Layout;
