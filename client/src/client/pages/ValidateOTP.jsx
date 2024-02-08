import React, { useEffect, useRef, useState } from 'react'
import Layout from '../common/Layout'
import Input from '../components/Input'
import '../assets/css/pages/validate-otp.css';

const ValidateOTP = () => {
    const otpLength = 4;
    const [otp,setOtp] = useState(new Array(otpLength).fill(''));
    const [active,setActive] = useState(0)

    const ref = useRef(null);
    const btnRef = useRef(null);

    const inputAttributes = {
        disabled:true,
        maxLength:1,
        type:'number',
        required:true,
        style:{textAlign:'center'}
    }
    
    const handleChange=(value,i)=>{
        value = value.substring(value?.length -1);
        let newOtp = [...otp]
        newOtp[i] = value
        setOtp(newOtp);
        if(active===3) btnRef?.current?.focus()
        if(value) setActive(prev=>prev<otpLength-1 ?prev+1:prev);
    }

    const handleKeyDown = ({key})=>{
        if(key === 'Backspace') setActive(prev=>prev>0 ?prev-1:prev);
    }

    const handleSubmit = ()=>{

    }

    useEffect(()=>{
        ref?.current?.focus()
    },[active])

  return (
    <Layout 
        title={`Validate Your OTP - ${process.env.REACT_APP_NAME}`}
        description="Validate your otp"
        url={`${process.env.REACT_APP_URL}/join/validate-otp`}
    >
        <div className="contact-us-wrapper">
            <h2>Verify Your OTP</h2>
            <div className="form-wrapper" style={{maxWidth:'400px',margin:'auto'}}>
                <form onSubmit={handleSubmit}>
                    <div className="otp-wrapper">
                        {
                            otp?.map((value,index)=><Input 
                            attributes={
                                {...inputAttributes,
                                onChange:(e)=>handleChange(e.target.value,index),
                                value:otp[index] ?? '',
                                disabled:active === index? false:true,
                                ref:active === index? ref:null,
                                onKeyUp:e=>handleKeyDown(e)
                            }}/>)
                        }
                    </div>
                    <button type="submit" ref={btnRef} className='btn btn-primary'>Send OTP</button>
                </form>
            </div>
        </div>
        {
            console.log(active)
        }
    </Layout>
  )
}

export default ValidateOTP