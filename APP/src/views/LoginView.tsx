import React, { useContext, useEffect } from "react";
import LoginForm from "../Components/LoginForm/LoginForm";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";

const LoginPage = ({ }) => {
  const { userData, signin } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();
  //@ts-ignore
  let from = location.state?.from?.pathname || "/private";
  useEffect(() => {
    if (userData.token) {
      navigate(from, { replace: true })
    }
  })

  return (
    <>
    <div className="page-title">
      <h1>
        Ingreso
      </h1>
      </div>
      <LoginForm signin={signin} />
    </>
  );
}

export default LoginPage;