import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        <div style={{ color: 'black' }}>Štepán Nižník</div>
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "black 4px solid",
    borderBottom: "black 4px solid",
  };
}

function footerStyle() {
  return { padding: "12px",
    textAlign: "center", 
    backgroundColor: "white", 
    color: "black"
  };
}

export default Layout;