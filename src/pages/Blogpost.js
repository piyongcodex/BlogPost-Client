import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Blogpost = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { blog } = location.state || {};
  const [blogpost, setBlogpost] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const reload = () => {
    const fetchBlogpost = async () => {
      try {
        const response = await fetch(
          `https://blogpost-server-3dk7.onrender.com/blogs/getBlog/${blog._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setBlogpost(data.blog);
        } else {
          setError(data.message || "Failed to fetch the blog post.");
        }
      } catch (error) {
        setError("Failed to fetch the blog post.");
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogpost();
  };

  const handleSaveBlog = async () => {
    try {
      const response = await fetch(
        `https://blogpost-server-3dk7.onrender.com/blogs/updateBlog/${blog._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: blogpost.title,
            author: blogpost.author,
            content: blogpost.content,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
      if (data.message === "Blogpost updated successfully") {
        Swal.fire({
          title: "Blog Updated Successful",
          icon: "success",
          showConfirmButton: true,
        });
        reload();
      } else {
        setError(data.message || "Failed to save the blog post.");
      }
    } catch (error) {
      setError("Failed to save the blog post.");
      console.error("Error saving blog post:", error);
    }
  };

  const handleEditField = async (field, newValue) => {
    try {
      setBlogpost((prevBlogpost) => ({
        ...prevBlogpost,
        [field]: newValue,
      }));
    } catch (error) {
      setError(`Failed to update ${field}.`);
      console.error(`Error updating ${field}:`, error);
    }
  };

  useEffect(() => {
    const fetchBlogpost = async () => {
      try {
        const response = await fetch(
          `https://blogpost-server-3dk7.onrender.com/blogs/getBlog/${blog._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setBlogpost(data.blog);
        } else {
          setError(data.message || "Failed to fetch the blog post.");
        }
      } catch (error) {
        setError("Failed to fetch the blog post.");
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogpost();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://blogpost-server-3dk7.onrender.com/blogs/addComment/${blog._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Update local state with the new comment
        setBlogpost((prevBlogpost) => ({
          ...prevBlogpost,
          comments: [...prevBlogpost.comments, data.comment],
        }));

        // Fetch updated blog post data to reflect the new comment
        reload();

        // Clear the comment input field
        setComment("");
      } else {
        setError(data.message || "Failed to add the comment.");
      }
    } catch (error) {
      setError("Failed to add the comment.");
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://blogpost-server-3dk7.onrender.com/blogs/removeComment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBlogpost((prevBlogpost) => ({
          ...prevBlogpost,
          comments: prevBlogpost.comments.filter((c) => c._id !== commentId),
        }));
      } else {
        setError(data.message || "Failed to delete the comment.");
      }
    } catch (error) {
      setError("Failed to delete the comment.");
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://blogpost-server-3dk7.onrender.com/blogs/updateComment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment: editCommentText }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBlogpost((prevBlogpost) => ({
          ...prevBlogpost,
          comments: prevBlogpost.comments.map((c) =>
            c._id === commentId ? { ...c, comment: editCommentText } : c
          ),
        }));
        setEditingCommentId(null);
        setEditCommentText("");
      } else {
        setError(data.message || "Failed to update the comment.");
      }
    } catch (error) {
      setError("Failed to update the comment.");
      console.error("Error updating comment:", error);
    }
  };

  const toggleEditComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditCommentText(currentText);
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await fetch(
        `https://blogpost-server-3dk7.onrender.com/blogs/deleteBlog/${blog._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message === "Blog deleted successfully") {
        Swal.fire({
          title: "Blog Deleted Successfully",
          icon: "success",
          showConfirmButton: true,
        });
        setBlogpost(null); // Clear the blogpost state after deletion
        setError(null); // Clear any previous error messages

        navigate("/");
      } else {
        setError(data.message || "Failed to delete the blog.");
      }
    } catch (error) {
      setError("Failed to delete the blog.");
      console.error("Error deleting blog:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogpost) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs="12">
          <Form.Group>
            <Form.Label>
              <strong>Title: </strong>
            </Form.Label>
            {user.isAdmin === true ? (
              <>
                <span> {blogpost.title}</span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteBlog()}
                  className="ml-2 mt-2"
                >
                  Delete Blog
                </Button>
              </>
            ) : blogpost.userId === user.id ? (
              <>
                <Form.Control
                  type="text"
                  value={blogpost.title}
                  onChange={(e) => handleEditField("title", e.target.value)}
                />
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleSaveBlog()}
                  className="ml-2 mt-2"
                >
                  Save Blog
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteBlog()}
                  className="ml-2 mt-2"
                >
                  Delete Blog
                </Button>
              </>
            ) : (
              <span> {blogpost.title}</span>
            )}
          </Form.Group>
        </Col>
        <Col xs="12">
          <Form.Group>
            <Form.Label>
              <strong>Author: </strong>
            </Form.Label>
            {blogpost.userId === user.id ? (
              <Form.Control
                type="text"
                value={blogpost.author}
                onChange={(e) => handleEditField("author", e.target.value)}
              />
            ) : (
              <span> {blogpost.author}</span>
            )}
          </Form.Group>
        </Col>
        <Col xs="12">
          <Form.Group>
            <Form.Label>
              <strong>Content: </strong>
            </Form.Label>
            {blogpost.userId === user.id ? (
              <Form.Control
                as="textarea"
                rows={5}
                value={blogpost.content}
                onChange={(e) => handleEditField("content", e.target.value)}
              />
            ) : (
              <span> {blogpost.content}</span>
            )}
          </Form.Group>
        </Col>
        <Col xs="6">
          <h3>Comments</h3>
          <ListGroup>
            {Array.isArray(blogpost.comments) &&
            blogpost.comments.length > 0 ? (
              blogpost.comments.map((comment) =>
                comment && comment.comment ? (
                  <ListGroup.Item
                    key={comment._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {editingCommentId === comment._id ? (
                      <Form.Control
                        type="text"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                      />
                    ) : (
                      <span>{comment.comment}</span>
                    )}

                    {/* Edit and Delete buttons */}
                    {comment.userId === user.id && (
                      <div className="d-flex">
                        {editingCommentId === comment._id ? (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleUpdateComment(comment._id)}
                            className="mr-2 mb-2"
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              toggleEditComment(comment._id, comment.comment)
                            }
                            className="mr-2 me-2"
                          >
                            Edit
                          </Button>
                        )}

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                    {user.isAdmin === true && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </ListGroup.Item>
                ) : null
              )
            ) : (
              <ListGroup.Item>No comments yet.</ListGroup.Item>
            )}
          </ListGroup>

          {user.isAdmin !== true ? (
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="comment">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Add Comment
              </Button>
            </Form>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Blogpost;
