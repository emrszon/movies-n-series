import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import Dashboard from "./Dashboard";
import RequiresAuth from "./PrivateRoute";
import { routes } from "./Routes";

const AppRouter = () => {

  return (
    <Routes>
      <Route
        path={"/"}
        element={<routes.LOGIN.element />}
      />
      <Route
        path={routes.LOGIN.path}
        element={<routes.LOGIN.element />}
      />
      <Route
        path={routes.CREATE_USERS.path}
        element={<routes.CREATE_USERS.element />}
      />
      <Route
        path={routes.PELICULAS.path}
        element={<RequiresAuth>
          {routes.PELICULAS.element}
        </RequiresAuth>}
      />
      <Route
        path={routes.SERIES.path}
        element={<RequiresAuth>
          {routes.SERIES.element}
        </RequiresAuth>}
      />
      <Route
        path={routes.NOT_FOUND.path}
        element={<routes.NOT_FOUND.element />}
      />
    </Routes>
  )
}


export default AppRouter;