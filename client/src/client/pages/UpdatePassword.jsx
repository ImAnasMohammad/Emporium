import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useValidateEmail } from '../../context/useValidateEmail'


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;


const UpdatePassword = () => {
    const [isOpen1,setIsOpen1] = useState(false)
    const [isOpen2,setIsOpen2] = useState(false)
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [isUpdating,setIsUpdating] = useState(false);
    const [validateEmail,setValidateEmail] = useValidateEmail();

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();

      setIsUpdating(prev=>prev=true);
      try{
        const res = await axios.post(`${serverURL}/users/update-password`,{token:validateEmail.token,password});

        console.log(res)

        if(res?.data?.success === true){
          toast.success('Successfully password updated')
          setValidateEmail(prev=>prev={...prev,token:null})
          localStorage.setItem("authToken",res?.data?.token);
          navigate(`/`)
        }else{
          toast.error(res?.data?.msg ?? "Something went wrong");
        }

      }catch(err){
        toast.error(err?.message ?? "Something went wrong")
      }
      setIsUpdating(false);
    }

    const canSubmit = ()=> password !==password2 || password ==='' || isUpdating

    useEffect(()=>{
      if(validateEmail?.token === null || validateEmail?.token === ''){
            navigate('/')
      }
    },[])

  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h2>Update Your Password</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className='btn btn-primary' disabled={canSubmit()}>{`${isUpdating?'Updating...':'Update'}`}</button>
        </form>
      </div>
    </div>
</Layout>
  )
}

export default UpdatePassword