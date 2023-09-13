import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : undefined
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : undefined
  );

  let [loading, setLoading] = useState(true)

  // Data for account settings and all that...
  let [userDeepDetails, setUserDeepDetails] = useState(undefined)
  let [serverAlert, setServerAlert] = useState(undefined)




  useEffect(() => {
    window.scrollTo(0, 0)
    if (authToken) {
        setUser(jwt_decode(authToken.access))
    }
    setLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, loading]);  // eslint-disable-line




  const navigate = useNavigate();

  const LoginSubmit = async (e) => {
    e.preventDefault();

    let headers = {
      "Content-Type": "application/json",
    };
    let fieldvalue = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        fieldvalue,
        headers
      );
      e.target["email"].value = "";
      e.target["password"].value = "";
      setServerAlert({
        ...serverAlert,
        alertHeader: "success",
        alertMessage: "Successfully logged in"
      });
      setAuthToken(response.data);
      setUser(jwt_decode(response.data.refresh));
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate(-1, {replace: true});
    } catch (error) {
      e.target["password"].value = "";
      setServerAlert({
        ...serverAlert,
        alertHeader: "danger",
        alertMessage: "Failed to logged in"
      });
    }
  };


  const logout = () => {
    
    setAuthToken(undefined);
    setUser(undefined);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    setServerAlert(undefined);
  };


  let content = {
    LoginSubmit: LoginSubmit,
    logout: logout,
    userDeepDetails,
    setUserDeepDetails,
    user: user,
    authToken: authToken,
    serverAlert : serverAlert,
    setServerAlert : setServerAlert,
  };

  return (

    <AuthContext.Provider value={content}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
