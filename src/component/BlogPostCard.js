import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./BlogPostCard.css";

const BlogPostCard = ({ blog, onDoubleClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card
      onDoubleClick={() => onDoubleClick(blog)}
      style={{ width: "18rem", height: "150px" }}
      className={`blog-post-card ${isHovered ? "hovered" : ""}`}
      onClick={() => onDoubleClick(blog)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          <FontAwesomeIcon icon={faUser} className="me-2" /> {blog.author}{" "}
          {formatDate(blog.creationDate)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BlogPostCard;
