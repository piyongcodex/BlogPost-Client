import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserContext from "../UserContext";

import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  // console.log(user.id);
  return (
    <Navbar expand="lg" className="border p-2" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="custom-navbar-brand ms-5">
          PiyongX - Blog Post
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-5">
            <Nav.Link
              as={NavLink}
              to="/"
              exact="true"
              className="custom-navbar-link"
            >
              Home
            </Nav.Link>
            {user.id !== null ? (
              <>
                {user.isAdmin === true ? (
                  <></>
                ) : (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/addblog"
                      exact="true"
                      className="custom-navbar-link"
                    >
                      Create Blog
                    </Nav.Link>
                  </>
                )}

                <Nav.Link as={Link} to="/logout" className="custom-navbar-link">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="custom-navbar-link">
                  Sign in
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
