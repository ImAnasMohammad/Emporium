import React, { useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Input from '../components/Input'
import '../assets/css/Components/Input.css'
import '../assets/css/contact-us.css'
import TextArea from '../components/TextArea'

const ContactUs = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  return (
    <div>
        <Header/>
        <div className="contact-us-wrapper">
          <h2>CONTACT US</h2>
          <div className="form-wrapper">
            <form action="">
              <div>
                <Input type='text' label="name" name="name" value={name} setValue={setName} required={true} />
                <Input type='email' label="email" name="email" value={email} setValue={setEmail} required={true} />
              </div>
              <TextArea label={"Message"} value={message} setValue={setMessage} required={true} name={'message'} row={10}/>
              <div className='submit-btn-contact'>
                <button type="submit" className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs