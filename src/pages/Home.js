import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogPostCard from "../component/BlogPostCard";
import UserContext from "../UserContext";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };

  useEffect(() => {
    fetch("https://blogpost-server-3dk7.onrender.com/blogs/getBlogs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message !== "No items found.") {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }
      });
  }, []);

  const handleDoubleClick = (blog) => {
    navigate(`/blog`, { state: { blog } });
  };
  console.log(user);
  return user.id === null ? (
    <>
      <h2>Welcome to Our Blog</h2>
      <p>To be updated from our latest post please create an account.</p>
      <Button onClick={handleNavigate}>Create</Button>
    </>
  ) : (
    <Container className="py-5">
      {blogs !== undefined && blogs.length > 0 ? (
        <Row>
          <h1>Welcome to PiyongX Blog</h1>
          {blogs.map((blog, index) => (
            <Col key={index} md={12} className="mt-3">
              <BlogPostCard blog={blog} onDoubleClick={handleDoubleClick} />
              <hr />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col className="text-center">
            <h2>Welcome to Our Blog</h2>
            <p>There are currently no blog posts available.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
