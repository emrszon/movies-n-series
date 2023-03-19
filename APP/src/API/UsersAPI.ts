import axios from "axios"
import { VARIABLES } from "../Configs/Settings";

export const login:any = (data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${VARIABLES.apiBaseUrl}/login/`,
        data,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        
        reject(err)});
  });
}

export const getUsers:any = (page:any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${VARIABLES.apiBaseUrl}/users/?page=${page}`,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err)});
  });
}

export const createUser:any = (data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${VARIABLES.apiBaseUrl}/register/`,
        data,
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        
        reject(err)});
  });
}
