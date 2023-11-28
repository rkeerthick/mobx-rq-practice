import Header from "../Header/Header";
import "./Layout.scss";

interface layout {
  children: JSX.Element;
}

const Layout = ({ children }: layout) => {
  return (
    <div className="grid-container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">sidebar</div>
      <div className="item3">{children}</div>
    </div>
  );
};

export default Layout;
