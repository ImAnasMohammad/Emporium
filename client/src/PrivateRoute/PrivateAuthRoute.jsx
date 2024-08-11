import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';

import {Navigate, Outlet} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const PrivateAuthRoute = ({isAdmin=false}) => {
      const [auth,setAuth] = useAuth();
      const [success,setSuccess] = useState(false);
      const [isLoading,setIsLoading] = useState(true);
      const URL = isAdmin?'auth/verify-admin-token':'auth/verify-token'

      

      useEffect(()=>{
            if(auth?.token){
                   const authVerify=async()=>{
                        try{
                              const res = await axios.get(`${serverURL}/${URL}`);
                              if(res.data.success){
                                    setSuccess(true);
                              }else{
                                    toast.error(res.data.message)
                              }
                        }catch(err){
                              if(err.response.data.name==='TokenExpiredError'){
                                    toast.error("Session has been expired");
                                    setAuth(prev=>prev={});
                              }else{
                                    toast.error(err.response.data.message);
                                    console.log(err.response.data.message)
                              }
                        }
                        setIsLoading(prev=>prev=false)
                  }
                  authVerify();
            }else{
                  setIsLoading(prev=>prev=false)
            }


      },[])

      return <>{isLoading?"Loading..":success?<Outlet/>:<Navigate to={'/join'}/>} </>
}

export default PrivateAuthRoute