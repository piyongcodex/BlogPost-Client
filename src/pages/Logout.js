import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
const Logout = () => {
  const { setUser, unsetUser } = useContext(UserContext);

  unsetUser();

  useEffect(() => {
    setUser({
      // access : null
      id: null,
      isAdmin: null,
    });
  });

  return <Navigate to="/login" />;
};

export default Logout;
