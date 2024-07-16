import { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();
    fetch("https://blogpost-server-3dk7.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error === "Username and password do not match") {
          Swal.fire({
            title: "Password incorrect!",
            icon: "error",
          });
        } else if (data.error === "No User found") {
          Swal.fire({
            title: "Not registered account",
            icon: "error",
          });
        } else if (data.access) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome PiyongX-Blogs!",
          });
        } else {
          Swal.fire({
            title: "Unexpected Error",
            icon: "danger",
            text: "Try Again!",
          });
        }
      });

    setUsername("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch("https://blogpost-server-3dk7.onrender.com/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [username, password]);

  return user && user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container className="my-5 p-3">
      <Row className="justify-content-center">
        <Col xs="10" md="4" className="border shadow-sm">
          <Form onSubmit={(e) => authenticate(e)}>
            <h1 className="my-5 text-center">Welcome Boss! Boss? Boss.</h1>

            <FloatingLabel controlId="userName" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Password"
              className="mt-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>

            <div className="d-flex justify-content-between align-items-center mt-3">
              {isActive ? (
                <Button
                  variant="primary"
                  type="submit"
                  id="submitBtn"
                  className="my-3"
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  variant="danger"
                  type="submit"
                  id="submitBtn"
                  disabled
                  className="my-3"
                >
                  Sign in
                </Button>
              )}
              <Link to="/register">Don't have an account? Sign up now!</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
