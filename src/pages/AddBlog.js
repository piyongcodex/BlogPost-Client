import React, { useState } from "react";
import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    fetch(`https://blogpost-server-3dk7.onrender.com/blogs/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        content,
        author,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Blog Creation Successful",
            icon: "success",
            showConfirmButton: true,
          });

          setTitle("");
          setContent("");
          setAuthor("");

          navigate("/"); // Navigate to the home page
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="6" className="mt-5">
          <h1 className="text-center">Create a Blog</h1>
          <Form onSubmit={(e) => add(e)}>
            <FloatingLabel controlId="title" label="Title" className="mt-3">
              <Form.Control
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="content" label="Content">
              <Form.Control
                as="textarea"
                placeholder="Content"
                style={{ height: "100px" }}
                className="mt-3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="author" label="Author" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FloatingLabel>

            <Button type="submit" className="mt-3">
              Save the Blog
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlog;
