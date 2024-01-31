import React from 'react'
import Animate from './Animate'
import Header from '../common/Header'
import Footer from '../common/Footer'

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