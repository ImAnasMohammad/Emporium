import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';

import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const PrivateAuthRoute = ({ isAdmin = false }) => {
    const [auth, setAuth] = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const URL = isAdmin ? 'auth/verify-admin-token' : 'auth/verify-token';
    const navigate = useNavigate();
    const [ok,setOk]=useState(false)



    useEffect(() => {
        if (auth?.token) {
            const authVerify = async () => {
                try {
                    const res = await axios.get(`${serverURL}/${URL}`);
                    if (res.data?.success) {
                        setOk(prev=>prev=true)
                    } else {
                        toast.error(res.data.message ?? "Something went wrong.");
                        navigate('/')
                    }
                } catch (err) {
                    if (err.response.data.name === 'TokenExpiredError') {
                        toast.error("Session has been expired");
                        setAuth({name:'',token:'',isAdmin:false});
                        navigate('/')
                    } else {
                        toast.error(err.response.data.message);
                        console.log(err.response.data.message)
                    }
                }
                setIsLoading(prev => prev = false)
            }
            authVerify();
        } else {
            setIsLoading(prev => prev = false)
        }


    }, [auth?.token])

    if(isLoading)return "Loading...";
    if(ok)return <Outlet/>;
}

export default PrivateAuthRoute