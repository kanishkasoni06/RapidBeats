import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { menuItems } from "../../constants";
import firebase from "../../security/firebase";

// import KeyCloakService from "../../security/KeyCloakService";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavModal() {
  const logout = () => {
    // KeyCloakService.CallLogout();
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        // Handle sign-out errors if needed
        console.error(error);
      });
  };
  const [expanded, setExpanded] = useState(false);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      expanded={expanded}
      className="p-2 navbar__mobile"
    >
      <Navbar.Brand href="#home">Musically</Navbar.Brand>
      <Navbar.Toggle
        onClick={handleNavToggle}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {menuItems?.map((item, index) => {
            return (
              <Link
                to={item.route}
                key={index}
                className="list-item-mobile"
                onClick={handleNavToggle}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavModal;
