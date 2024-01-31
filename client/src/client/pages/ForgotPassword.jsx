import React, { useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const handleSubmit = ()=>{

    }
  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h2>Find Your Account</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <Input type='email' label="email" name="email" value={email} setValue={setEmail} required={true} />
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