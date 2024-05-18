import React from 'react'
import SideBar from '../components/SideBar'
import '../assets/css/main.css'
import CustomSpinner from '../components/CustomSpinner'


const Layout = ({children,page,isLoading}) => {
  return <>
    <SideBar page={page}>
      {children}
    </SideBar>
    {isLoading ?
      <CustomSpinner/>
    :''}
  </>
}

export default Layout