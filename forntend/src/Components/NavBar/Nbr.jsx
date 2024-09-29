import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function Nbr() {
  const navigator = useNavigate();
  const profilePicture = "";
  const loginId = localStorage.getItem("loginId");
  const user = localStorage.getItem("User");
  const handlelogOut = async (e) => {
    localStorage.clear("authToken");
    setTimeout(() => {
      navigator("/");
    }, 100);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/Home">
          <Nav.Link as={Link} to="/">
            Navbar scroll
          </Nav.Link>{" "}
        </Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/Home">
              Home
            </Nav.Link>{" "}
            {localStorage.getItem("User") === "Admin" ? (
              <Nav.Link as={Link} to={`/Dashboard/${loginId}`}>
                DashBoard
              </Nav.Link>
            ) : (
              ""
            )}
            {user === "Admin" ? (
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/ShiftAllote">
                  ShiftAllote
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>

          {localStorage.getItem("logged") ? (
            <Nav>
              {localStorage.getItem("User") === "Student" ? (
                <>
                  <NavDropdown
                    title="LogOut"
                    className="me-6"
                    id="navbarScrollingDropdown"
                  >
                    {/* <NavDropdown.title></NavDropdown.title> */}
                    <NavDropdown.Item
                      as={Link}
                      to={`/Profile/${user}/${loginId}`}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#settings">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handlelogOut}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <p style={{ fontWeight: "bold", color: "black" }}>
                    {localStorage.getItem("User")}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={`http://localhost:5000/${profilePicture}`}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <NavDropdown.Item
                    onClick={handlelogOut}
                    style={{ color: "black" }}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/Sign">
                <p>Registor</p>
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/Login">
                Login
              </Nav.Link>{" "}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nbr;
