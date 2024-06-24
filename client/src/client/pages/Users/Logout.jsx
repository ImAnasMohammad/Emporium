import React, { useEffect } from 'react'
import { useAuth } from '../../../context/useAuth'
import { Navigate } from 'react-router-dom';


const Logout = () => {

  const [auth,setAuth] = useAuth()
  useEffect(()=>{
    if(auth?.name !== '' && auth?.token !==''){
      setAuth(prev=>prev={name:'',token:''});
    }
    localStorage.removeItem('auth');
  },[])
  return (
    <Navigate to={'/'}/>
  )
}

export default Logout