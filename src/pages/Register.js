import { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Register() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch("https://blogpost-server-3dk7.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //determine the returned data. Especially useful when the given API is online.
        console.log(data);
        if (data.error === "Username must be atleast 4 characters") {
          Swal.fire({
            title: "Username invalid",
            icon: "error",
            text: "must be 4 characters",
          });
        } else if (data.message === "Registered SUccessfully") {
          //data will only contain an email property if we can properly save our user.
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Registration successful",
            icon: "success",
            text: "You can now sign in",
          });

          navigate("/login");
        }
      });
  }

  useEffect(() => {
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [username, email, password, confirmPassword]);

  return user.id !== null ? (
    <Navigate to="/login" />
  ) : (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs="12" md="6" className="border shadow-lg">
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Create a Blogpost Account</h1>

            <FloatingLabel controlId="userName" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="email" label="E-mail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <FloatingLabel
              controlId="password"
              label="Confirm Password"
              className="mt-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FloatingLabel>

            {isActive ? (
              <Button variant="primary" type="submit" className="my-3">
                Create
              </Button>
            ) : (
              <Button variant="primary" disabled className="my-3">
                Create
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
