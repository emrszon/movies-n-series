import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { routes } from "./Routes";

const RequiresAuth = (props:any) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  
if (!auth.userData.token) {
    return <Navigate to={routes.LOGIN.path} state={{ from: location }}  />;
    }
  return <props.children />;
}

export default RequiresAuth;