import axios from "axios"
import { VARIABLES } from "../Configs/Settings";

export const getRandomContent:any = (type:string, token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${VARIABLES.apiBaseUrl}/api/random?type=${type}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          }
        }
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
export const getContent:any = (type:string, orderKey:string, orderValue:string, filterKey:string, filterValue:string, token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${VARIABLES.apiBaseUrl}/api/${type}?orderBy=${orderKey}&order=${orderValue}&filterBy=${filterKey}&filter=${filterValue}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          }
        }
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

export const postRateContent:any = (rate:number, contentId:string, token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${VARIABLES.apiBaseUrl}/api/rate-content`, 
        
      {contentId, rate},
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          }
        }
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

export const setViewContent:any = (contentId:string, token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${VARIABLES.apiBaseUrl}/api/view-content`, 
        
      {contentId},
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          }
        }
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
