import React from 'react'
import Animate from '../layouts/Animate'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <Animate transition={{duration:.75,delay:0.2}}>
        <Header/>
        {children}
        <Footer/>
    </Animate>
  )
}

export default Layout