import { useNavigate } from "react-router-dom";



import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Icon from "@mdi/react";
import { mdiFileDocument } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={ mdiFileDocument} size={1} color={"white"} />
            Data Converter
          </Button>
        </Navbar.Brand>
        <Nav>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "white" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    backgroundColor: "Black"
  };
}


export default NavBar;