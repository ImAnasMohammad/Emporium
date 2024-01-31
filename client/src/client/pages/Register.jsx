import React, { useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Register = () => {
    const [isOpen1,setIsOpen1] = useState(false)
    const [isOpen2,setIsOpen2] = useState(false)
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [email,setEmail] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("first")
    }

  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h2>Create account</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <Input type='email' label="email" name="email" value={email} setValue={setEmail} required={true} />
            <div className="password-wrapper">
                <Input type={`${isOpen1?'text':'password'}`} label="new password" name="password" value={password1} setValue={setPassword1} required={true} className='password-field' />
                <span><button type='button' onClick={()=>setIsOpen1(prev=>!prev)}>{isOpen1?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
            </div>
            <div className="password-wrapper">
                <Input type={`${isOpen2?'text':'password'}`} label="Confrim password" name="password" value={password2} setValue={setPassword2} required={true} className='password-field' />
                <span><button type='button' onClick={()=>setIsOpen2(prev=>!prev)}>{isOpen2?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
            </div>
            <button type="submit" className='btn btn-primary'>Create Account</button>
        </form>
        <div className='join-fotter'>
            <Link to='/join'>login account</Link>
        </div>
      </div>
    </div>
</Layout>
  )
}

export default Register