import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext('');

export default function UserProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem('token') );
  const [userInfo, setUserInfo] = useState(null );
    async function getUserInfo(){
    try {
       const options ={

        url: `https://route-posts.routemisr.com/users/profile-data`,
        method : 'GET',
        headers :{
authorization: `Bearer ${token}`        }
    }
    const{data} = await axios.request(options)
    console.log(data.data.user)
   setUserInfo(data.data.user);
    } catch (error) {
      console.log(error)
    }
   
   }
   useEffect(()=>{
getUserInfo()
   }, [token])

   
  return (
    <userContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}