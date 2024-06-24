import React, { useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useValidateEmail } from '../../context/useValidateEmail'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [validateEmail,setValidateEmail] = useValidateEmail();
    const redirect = useNavigate()
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(email === ''){
        toast.error("Invalid mail")
        return;
      }
      setValidateEmail(prev=>prev={...prev,mail:email,redirectTo:'/join/update-password'})
      redirect("/join/request-otp")
    }
  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h2>Find Your Account</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <Input
              type='email'
              label="email"
              name="email"
              value={email}
              onChange={e=>setEmail(prev=>prev=e.target.value)}
              required={true}
            />
            <button type="submit" className='btn btn-primary'>Send OTP</button>
        </form>
        <div className='join-fotter'>
            <Link to='/join'>login account</Link>
        </div>
      </div>
    </div>
</Layout>
  )
}

export default ForgotPassword