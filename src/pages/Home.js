import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogPostCard from "../component/BlogPostCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

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

  return (
    <Container className="py-5">
      {blogs !== undefined && blogs.length > 0 ? (
        <Row>
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
