import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';

import {  Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const PublicAuthRoute = () => {
    const [auth, setAuth] = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    async function authVerify() {
        try {
            const res = await axios.get(`${serverURL}/auth/verify-token`);
            if (res.data.success) {
                navigate('/');
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            if (err.response.data.name === 'TokenExpiredError') {
                toast.error("Session has been expired");
                setAuth({name:'',token:'',isAdmin:false});
                navigate('/');
            } else {
                toast.error(err.response.data.message);
                console.log(err.response.data.message)
            }
        }
        setIsLoading(prev => prev = false)
    }

    useEffect(() => {
        authVerify()
    }, [auth?.token])

    return isLoading ? "Loading..." : <Outlet />
}

export default PublicAuthRoute