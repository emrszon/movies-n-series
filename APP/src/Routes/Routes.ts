import { ReactElement } from "react";
import CreateUserPage from "../views/CreateUserView";
import NotFoundPage from "../views/Error404View";
import LoginPage from "../views/LoginView";
import MoviesPage from "../views/MoviesView";
import SeriesPage from "../views/SeriesView";

export interface Route{ path: string; label: string; element: ({}:{})=>JSX.Element; isPrivate: boolean;};

export const routes:{PELICULAS:Route, LOGIN:Route, CREATE_USERS:Route, NOT_FOUND:Route, SERIES:Route,} = {
  LOGIN:{
    path: "/ingreso",
    label:"Ingreso",
    element: LoginPage,
    isPrivate: false,
  },
  PELICULAS:{
    path: "/peliculas",
    label:"Películas",
    element: MoviesPage,
    isPrivate: true,
  },
  SERIES:{
    path: "/series",
    label:"Series",
    element: SeriesPage,
    isPrivate: true,
  },
  CREATE_USERS:{
    path: "/registro",
    label:"Registrar",
    element: CreateUserPage,
    isPrivate: false,
  },
  NOT_FOUND:{
    path: "*",
    label: "Error 404",
    element: NotFoundPage,
    isPrivate: false,
  }
};