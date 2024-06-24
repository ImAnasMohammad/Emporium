import React, { useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useValidateEmail } from '../../context/useValidateEmail'


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;


const Register = () => {
    const [isOpen1,setIsOpen1] = useState(false)
    const [isOpen2,setIsOpen2] = useState(false)
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [mail,setMail] = useState('');
    const [name,setName] = useState('');
    const [isCreating,setIsCreating] = useState(false);
    const [validateEmail,setValidateEmail] = useValidateEmail();

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();

      setIsCreating(prev=>prev=true);
      try{
        const res = await axios.post(`${serverURL}/auth/register`,{name,mail,password});

        if(res?.data?.success === true){
          toast.success('Successfully registered')
          const {mail,alreadyExist} = res.data;
          setValidateEmail(prev=>prev={...prev,mail,alreadyExist})
          navigate(`/join/request-otp/`)
        }else{
          toast.error(res?.data?.msg ?? "Something went wrong");
        }

      }catch(err){
        toast.error(err?.message ?? "Something went wrong")
      }
      setIsCreating(false);
    }

    const canSubmit = ()=>mail ==='' || password !==password2 || password ==='' || name === '' || isCreating

  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h2>Create account</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <Input
              type='text'
              label="name"
              name="name"
              value={name} 
              required={true}
              onChange={e=>setName(e.target.value)}  
            />
            <Input
              type='mail'
              label="email"
              name="email"
              value={mail}
              onChange={e=>setMail(e.target.value)}
              required={true}
            />
            <div className="password-wrapper">
                <Input
                  type={`${isOpen1?'text':'password'}`}
                  label="password"
                  name="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  required={true}
                  className='password-field' />
                <span><button type='button' onClick={()=>setIsOpen1(prev=>!prev)}>{isOpen1?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
            </div>
            <div className="password-wrapper">
                <Input
                  type={`${isOpen2?'text':'password'}`}
                  label="Confirm password"
                  name="password"
                  value={password2}
                  onChange={e=>setPassword2(e.target.value)}
                  required={true}
                  className='password-field'
                />
                <span><button type='button' onClick={()=>setIsOpen2(prev=>!prev)}>{isOpen2?<FaRegEye/>:<FaRegEyeSlash/>}</button></span>
            </div>
            <button type="submit" className='btn btn-primary' disabled={canSubmit()}>{`${isCreating?'Registering...':'Register'}`}</button>
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