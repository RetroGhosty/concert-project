import { React, useContext } from "react";
import AuthContext from "../context/AuthContext";
const Homepage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user && user.email}
      
    </div>
  );
};

export default Homepage;
