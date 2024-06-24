import React, { useEffect, useRef, useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import '../assets/css/pages/validate-otp.css';
import { useValidateEmail } from '../../context/useValidateEmail';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

const ValidateOTP = () => {
    const otpLength = 4;
    const [otp,setOtp] = useState(new Array(otpLength).fill(''));
    const [active,setActive] = useState(0);
    const [validateEmail,setValidateEmail] = useValidateEmail();
    const navigate = useNavigate();
    const [isValidating,setIsValidating] = useState(false);

    const ref = useRef(null);
    const btnRef = useRef(null);

    const extraAttributes = {
        maxLength:1,
        style:{textAlign:'center'},
        onKeyUp:handleKeyDown
    }
    
    const handleChange=(value,i)=>{
        value = value.substring(value?.length -1);
        let newOtp = [...otp]
        newOtp[i] = value
        setOtp(newOtp);
        if(value) setActive(prev=>prev= prev<otpLength-1 ?prev+1:prev);
    }

    function handleKeyDown({key}){
        if(key === 'Backspace') setActive(prev=>prev=prev>0 ?prev-1:prev);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsValidating(prev=>prev=true)
        try{

            const res = await axios.post(`${serverURL}/auth/verify-otp`,{id:validateEmail.id,otp:otp?.map(Number).join("")});

            if(res?.data?.success){

                toast.success(res?.data?.msg);
                setValidateEmail(prev=>prev={
                    ...prev,
                    mail:'',
                    otpSend:false,
                    alreadyExist:false,
                    id:null,
                    redirectTo:'/',
                    token:res?.data?.token ?? null
                });
                navigate(validateEmail.redirectTo ?? '/');
                
            }else{
                toast.error(res?.data?.msg)
            }

        }catch(err){
            toast.error(err?.message ?? "Something went wrong")
        }
        setIsValidating(prev=>prev=false);
    }

    useEffect(()=>{
        ref?.current?.focus()
    },[active])


    useEffect(()=>{
        if(validateEmail.mail === '' || !validateEmail.otpSend){
            navigate('/join')
        }
    },[])

  return (
    <Layout 
        title={`Validate Your OTP - ${process.env.REACT_APP_NAME}`}
        description="Validate your otp"
        url={`${process.env.REACT_APP_URL}/join/validate-otp`}
    >
        <div className="contact-us-wrapper">
            <h2>Verify Your OTP</h2>
            <div style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
                marginBottom:'50px',
                gap:'5px'
            }}>
                <span>Enter Your OTP which is we sent to your email</span>
                <span className='text-bold'>{validateEmail.mail}</span>
            </div>
            <div className="form-wrapper" style={{maxWidth:'400px',margin:'auto'}}>
                <form onSubmit={handleSubmit}>
                    <div className="otp-wrapper">
                        {
                            otp?.map((value,index)=>(
                                <Input
                                    type="number"
                                    extraAttributes={extraAttributes}
                                    onChange={(e)=>handleChange(e.target.value,index)}
                                    value={otp[index] ?? ''}
                                    disabled={active === index? false:true}
                                    autoFocus={true}
                                    reference={active === index? ref:null}
                                    required={true}
                                />)
                            )
                        }
                    </div>
                    <button type="submit" ref={btnRef} className='btn btn-primary'>{`${isValidating?"Verifying your OTP...":"Verify your OTP"}`}</button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default ValidateOTP