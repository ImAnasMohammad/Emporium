import React, { useState } from 'react'
import Input from '../components/Input'
import '../assets/css/layouts/subscribeLetter.css'

const SubscribeLetter = () => {
    const [email,setEmial] = useState('');
    let attributes = {
        type:'email',
        onChange:e=>setEmial(e.target.value),
        value:email,
        placeholder:'example@example.com'
    }
  return (
    <div className='subscribe-letter-wrapper'>
        <div>
            <h1>Stay updated with us</h1>
            <p>Subscribe to our latest products</p>
            <form>
                <Input attributes={attributes}/>
                <button type='submit' className='btn btn-primary'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default SubscribeLetter