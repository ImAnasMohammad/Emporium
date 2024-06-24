import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';

import {Navigate, Outlet} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const PublicAuthRoute = () => {
      const [auth] = useAuth();
      const [success,setSuccess] = useState(false);
      const [isLoading,setIsLoading] = useState(true);

      async function authVerify(){
            try{
                  const res = await axios.get(`${serverURL}/auth/verify-token`);
                  if(res.data.success){
                        setSuccess(true);
                  }
            }catch(err){
                  toast.error(err.message ?? "Something went wrong while validating session")
            }
            setIsLoading(prev=>prev=false)
      }

      useEffect(()=>{
            if(auth?.token){
                  authVerify();
            }else{
                  setIsLoading(prev=>prev=false)
            }

      },[auth])

      return isLoading?"Loading...":success?<Navigate to={'/profile'}/>:<Outlet/>
}

export default PublicAuthRoute