import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../assets/css/pages/Join.css'
import '../assets/css/Components/Input.css'
import '../assets/css/pages/contact-us.css'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/useAuth';

const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const Join = () => {
  const [auth,setAuth] = useAuth();
    const [isOpen,setIsOpen] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const redirect = useNavigate()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{

        const res = await axios.post(`${serverURL}/auth/login`,{mail:email,password});

        if(res?.data?.success){
          toast.success("Login successful");
          let data = {
            name:res.data?.name ?? '',
            token:res.data?.token ?? '',
            isAdmin:res.data?.isAdmin ?? false
          }
          setAuth(prev=>prev={...data})
          localStorage.setItem("auth",JSON.stringify({...data}));
          redirect(`${data?.isAdmin?'/admin/dashboard':'/'}`)
        }else{
          toast.error(res?.data?.msg ?? "Invalid details")
        }

      }catch(err){
        toast.error(err?.message ?? "SOmething went wrong")
      }
    }
  return (
    <Layout>
        <div className="contact-us-wrapper">
          <h2>Login</h2>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <Input
                  type='email'
                  label="email"
                  name="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  required={true}
                  />
                <div className="password-wrapper">
                    <Input
                      label="password"
                      name="password"
                      type={`${isOpen?'text':'password'}`}
                      className='password-field'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      required={true}
                      />
                    <span><button type='button' onClick={()=>setIsOpen(prev=>!prev)}>{isOpen?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
            <div className='join-fotter'>
                <Link to="/join/register">create account</Link>
                <Link to="/join/forgot-password">Forgot password ?</Link>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Join