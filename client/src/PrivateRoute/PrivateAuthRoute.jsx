import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';

import {Outlet, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const PrivateAuthRoute = () => {
      const [success,setSuccess] = useState(false);
      const [auth] = useAuth();
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


      },[])

      return isLoading?"Loading...":success?<Outlet/>:<Redirect to={auth}/>
}

const Redirect = ({to})=>{
      const redirect = useNavigate();
      useEffect(()=>{
            // redirect('/join')
            console.log(to)
      },[])

      return <></>
}
export default PrivateAuthRoute