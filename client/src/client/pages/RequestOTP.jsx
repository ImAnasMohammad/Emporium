import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useValidateEmail } from '../../context/useValidateEmail'


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;


const RequestOTP = () => {
    const [requestCompleted,setRequestCompleted] = useState(false);

    const [validateEmail,setValidateEmail] = useValidateEmail();

    const navigate = useNavigate();

    const handleClick = async ()=>{

      setRequestCompleted(prev=>prev=true);
      setValidateEmail(prev=>prev={...prev,otpSend:true});
      setRequestCompleted(prev=>prev=false);
      try{
        const res = await axios.post(`${serverURL}/auth/generate-otp`,{mail:validateEmail.mail});
        if(res?.data?.success === true){
          toast.success('Successfully OTP sent to your registered mail');
          setValidateEmail(prev=>prev={...prev,otpSend:true,id:res?.data?.data})
          navigate(`/join/validate-otp`)
        }else{
          toast.error(res?.data?.msg ?? "Something went wrong");
        }

      }catch(err){
        toast.error(err?.message ?? "Something went wrong")
      }
      setRequestCompleted(false);
    }

    useEffect(()=>{
      if(!validateEmail?.mail) navigate('/join');
    },[])

  return (
    <Layout>
    <div className="contact-us-wrapper">
      <h3 style={{textAlign:'center'}}>WOW Your account created</h3>
      <div style={{display:'flex',flexDirection:'column',textAlign:'center',alignItems:'center',margin:'50px 0px'}}>
            <span>Now you can request top</span>
            { validateEmail?.alreadyExist ?? <span>It seems already you have account</span>}
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
            <button className='btn btn-primary' style={{margin:'auto'}} onClick={handleClick}>{`${requestCompleted?"Requesting OTP...":"Request OTP"}`}</button>
      </div>
    </div>
</Layout>
  )
}

export default RequestOTP