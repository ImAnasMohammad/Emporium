import React from 'react'
import SideBar from '../components/SideBar'
import '../assets/css/main.css'
import CustomSpinner from '../components/CustomSpinner'


const Layout = ({children,page,isLoading}) => {
  return <div style={{position:'relative'}}>
    <SideBar page={page}>
      {children}
    </SideBar>
    {isLoading &&<div style={{
            backgroundColor:'rgba(250,250,250,0.5)',
            height:'100%',
            position:'absolute',
            width:'100%',
            top:0,
            zIndex:2,
            display:'flex',
            alignItems:'center'
        }}><CustomSpinner/></div>}
  </div>
}

export default Layout