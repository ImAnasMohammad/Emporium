import React, { useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Input'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../assets/css/Join.css'
import '../assets/css/Components/Input.css'
import '../assets/css/contact-us.css'
import { Link } from 'react-router-dom';

const Join = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  return (
    <Layout>
        <div className="contact-us-wrapper">
          <h2>Login</h2>
          <div className="form-wrapper">
            <form action="">
                <Input type='email' label="email" name="email" value={email} setValue={setEmail} required={true} />
                <div className="password-wrapper">
                    <Input type={`${isOpen?'text':'password'}`} label="password" name="password" value={password} setValue={setPassword} required={true} className='password-field' />
                    <span><button type='button' onClick={()=>setIsOpen(prev=>!prev)}>{isOpen?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
            <div className='join-fotter'>
                <Link to="/join/register">create account</Link>
                <Link to="/forgot">Forgot password ?</Link>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Join