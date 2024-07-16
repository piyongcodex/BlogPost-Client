import React, { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Footer from "./component/Footer";
import AppNavbar from "./component/AppNavbar";
import AddBlog from "./pages/AddBlog";
import Blogpost from "./pages/Blogpost";

import "./App.css"; // Import the CSS file

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`https://blogpost-server-3dk7.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "jwt malformed") {
          setUser({
            id: null,
            isAdmin: null,
          });
        } else {
          setUser({
            id: data._id,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <div className="App">
          <AppNavbar className="App-navbar" />
          <Container className="App-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addblog" element={<AddBlog />} />
              <Route path="/blog" element={<Blogpost />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
          <Footer className="App-footer" />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
