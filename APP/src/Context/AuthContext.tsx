import React, { createContext, useContext, useState } from "react";
import { login } from "../API/UsersAPI";

interface User {
  userData: any,
  signin: any,
  signout: any
}

export const AuthContext = createContext({} as User);

const AuthContextProvider: React.FC<{}> = (props) => {
  const [userData, setUserData] = useState<{ user: string | undefined, token: string | undefined }>({ user: undefined, token: undefined });

  const signin = async (data: any) => {
    try {
      const response = await login(data);

      if (response.token) {
        setUserData({ user: data.email, token: response.token });
      }
    } catch (error) {
      console.log(error);
    }

  };

  const signout = () => {
    setUserData({ user: undefined, token: undefined })
  };
  return (
    <AuthContext.Provider value={{
      userData,
      signin,
      signout
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider