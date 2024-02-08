import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/common/navbar.css'
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
const NavBar = () => {
  return (
    <div>
  <header className="header" id="header">
    <div className="header_toggle"> <IoMdMenu /> </div>
  </header>
  <div className="l-navbar" id="nav-bar">
    <nav className="nav" style={{overflow:'auto !important'}}>
      <div style={{overflow:'auto !important'}}>
        <Link href="#" className="nav_logo"><i className="bx bx-layer nav_logo-icon" /><span className="nav_logo-name">BBBootstrap</span></Link>
        <div className="nav_list" >
          <Link href="#" className="nav_link active">
            <AiTwotoneAppstore style={{fontSize:'1.6rem'}}/><span className="nav_name">Dashboard</span>
          </Link>
          <Link href="#" className="nav_link">
            <LuUser2 /> <span className="nav_name">Users</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Orders</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Category</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Sub Category</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Inventory</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Contacted Us</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Subscribed</span>
          </Link>
          <Link href="#" className="nav_link">
            <CiShoppingCart /> <span className="nav_name">Manage website</span>
          </Link>
          
        </div>
      </div>
      <Link href="#" className="nav_link"> <i className="bx bx-log-out nav_icon" /> <span className="nav_name">SignOut</span> </Link>
    </nav>
  </div>
</div>

  )
}

export default NavBar