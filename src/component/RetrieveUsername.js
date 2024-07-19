import React, { useEffect, useState } from "react";

const RetrieveUsername = ({ userId }) => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    fetch(`https://blogpost-server-3dk7.onrender.com/users/getName/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
      });
  }, []);

  return (
    <>
      <strong>{email}</strong>
    </>
  );
};
export default RetrieveUsername;
