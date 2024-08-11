import React, { useState } from 'react'
import Input from '../components/Input'
import '../assets/css/Components/Input.css'
import '../assets/css/pages/contact-us.css'
import TextArea from '../components/TextArea'
import Layout from '../common/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'

const ContactUs = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  
  const serverURL = process.env.REACT_APP_SERVER_BASE_URL;

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(prev=>prev=true);
    try{
      const res = await axios.post(`${serverURL}/contact`,{name,email,message});
      if(res?.data?.success){
        toast.success("Data successfully saved.")
      }else{
        toast.error(res?.data?.msg ?? "Something went wrong");
      }

    }catch(err){
      console.log("Error");

      toast.error(err?.message ?? "Something went wrong");
    }
    setIsLoading(prev=>prev=false);
  }

  const isCanSubmit = ()=>{
    console.log(name === '' || email === '' || message === '' || isLoading)
    return name === '' || email === '' || message === '' || isLoading
  }
  return (
      <Layout>
        <div className="contact-us-wrapper">
          <h2>CONTACT US</h2>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div>
                <Input type='text' label="name" name="name" value={name} onChange={e=>setName(e.target.value)} required={true} />
                <Input type='email' label="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required={true} />
              </div>
              <TextArea label={"Message"} value={message} setValue={setMessage} required={true} name={'message'} row={10}/>
              <div className='submit-btn-contact'>
                <button
                  type="submit"
                  className='btn btn-primary'
                  disabled={isCanSubmit()}
                  >{`${isLoading?'Submitting..':'Submit'}`}</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
  )
}

export default ContactUs