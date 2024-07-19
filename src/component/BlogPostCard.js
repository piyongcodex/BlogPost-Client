import React, { useState, useContext } from "react";
import { Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons"; // Import faComment for comments icon
import UserContext from "../UserContext";
import "./BlogPostCard.css";

const BlogPostCard = ({ blog, onDoubleClick }) => {
  const { user } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to check if the blog is new
  const isNewBlog = (creationDate) => {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const now = new Date();
    const blogDate = new Date(creationDate);
    return now - blogDate < ONE_DAY_IN_MS;
  };

  // Mock function to get number of comments (replace with actual logic)
  const getNumberOfComments = () => {
    // Replace with your logic to get the number of comments for the blog
    return blog.comments.length;
  };

  return (
    <Card
      onDoubleClick={() => onDoubleClick(blog)}
      style={{
        width: "50rem",
        height: "150px",
        position: "relative",
        border: "none", // Remove border
      }}
      className={`blog-post-card ${isHovered ? "hovered" : ""}`}
      onClick={() => onDoubleClick(blog)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          <FontAwesomeIcon icon={faUser} className="me-2" /> {blog.author}{" "}
          {formatDate(blog.creationDate)}
        </Card.Text>
      </Card.Body>
      {blog.userId === user.id && (
        <Badge
          bg="success"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          My Blog
        </Badge>
      )}
      {isNewBlog(blog.creationDate) && (
        <Badge
          bg="info"
          className="me-2"
          style={{
            position: "absolute",
            top: "10px",
            right: blog.userId === user.id ? "70px" : "10px",
          }}
        >
          New
        </Badge>
      )}
      {/* Badge for comments count */}
      <Badge
        bg="secondary"
        className="mt-2"
        style={{ position: "absolute", bottom: "10px", right: "10px" }}
      >
        <FontAwesomeIcon icon={faComment} className="me-2" />{" "}
        {getNumberOfComments()} Comments
      </Badge>
    </Card>
  );
};

export default BlogPostCard;
