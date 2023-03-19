import { Route } from "react-router-dom";
import Header from "../Components/Header/Header";

const Dashboard = (props:any) => {
  return (
    <>
    {props.children}
    </>
  );
}

export default Dashboard;