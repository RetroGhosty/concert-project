import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";
import AlertCard from "../components/AlertCard";
import { PurpleButton } from "../components/CustomizedMaterials";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { LoginSubmit, serverAlert } = useContext(AuthContext);
  
  return (
    <FormCard>
      <div className="bg-dark text-light p-5 rounded">
        <h1>Login</h1>
        <form onSubmit={LoginSubmit}>
          {serverAlert && <AlertCard alertHeader={`alert alert-${serverAlert.alertHeader}`} alertMessage={serverAlert.alertMessage}/>}
          <FormInput label="Email" inputID="email" inputType="text"/>
          <FormInput label="Password" inputID="password" inputType="password"/>
          <PurpleButton type="Submit" className="px-5 py-2 mt-3">Login</PurpleButton>
          <Link to="/register" className="ps-3 text-primary display-7 text-decoration-none">No existing account..</Link>
        </form>
      </div>
    </FormCard>
  );
};

export default LoginPage;
