import Header from "../../Containers/Header/Header";
import Sidebar from "../../Containers/SideBar/Sidebar";
import { layout } from "../../Types";
import "./Layout.scss";

const Layout = ({ children }: layout) => {
  return (
    <div className="grid-container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2"><Sidebar /></div>
      <div className="item3">{children}</div>
    </div>
  );
};

export default Layout;
