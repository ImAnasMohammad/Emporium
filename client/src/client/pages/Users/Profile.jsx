import React from 'react'
import { useAuth } from '../../../context/useAuth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [auth,setAuth] = useAuth()
  const redirect = useNavigate()
  const handleLogOut = ()=>{
    setAuth(prev=>prev={name:'',token:''})
    redirect('/')
  }
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <button className='btn btn-secondary' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Profile