import React, { useState } from 'react'
import logo from "../assets/images/logo.jpeg";
import '../assets/css/layouts/navbar.css';

import { SlUser } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink } from 'react-router-dom';
import Cart from '../layouts/Cart';
import Input from '../components/Input';
import { useAuth } from '../../context/useAuth';
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {

  const [isOpen,setIsOpen] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [search,setSearch] = useState('');
  const [searchOpen,setSearchOpen] = useState(false);
  const [auth] = useAuth();

  return (
    <>
    <SearchBox searchOpen={searchOpen} setSearchOpen={setSearchOpen} search={search} setSearch={setSearch}/>
      <Cart openCart={openCart} setOpenCart={setOpenCart}/>
      <nav className='navbar'>
        <div onClick={()=>setIsOpen(prev=>!prev)}className={`nav-shadow-wrapper ${isOpen ? 'active' :''}`}></div>
        <Link>
          <div className='logo'>
              <img src={logo} alt='Internal Server Error...' />
              <div className='logo_txt'>
                <h3>SV</h3>
                <span>EMPORIUM</span>
              </div>
          </div>
        </Link>
        <div className={`nav_items ${isOpen && 'active'}`}>
          <ul>
            <li>
              <NavLink to='/' >Home</NavLink>
            </li>
            <li>
              <NavLink  to='/products'>Products</NavLink>
            </li>
            <li>
              <NavLink  to={`${auth?.token && auth?.name ?auth?.isAdmin?'/admin/dashboard':'/profile/my-orders':'/join'}`}>
                {auth?.isAdmin ?'Dashboard':'My Orders'}
                {console.log(auth)}
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact-us'>Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className='nav_icons'>
          <ul>
            <li>
              <CiSearch onClick={()=>setSearchOpen(true)} style={{cursor:'pointer'}}size={25}/>
            </li>
            <li>           
                <BsHandbag onClick={()=>setOpenCart(true)} style={{cursor:'pointer'}} size={20}/>
            </li>
            <li onClick={()=>setIsOpen(prev=>!prev)} className='mobile-menu-icon'>
              {isOpen ?<RxCross2 size={25} />: <RiMenu2Line size={25} /> }
            </li>
            <li>
              {
                auth?.name !=='' && auth?.token !=='' ?
                  <NavLink to= '/profile/logout' style={{color:'var(--color2)'}}>
                    <IoIosLogOut size={20}/>
                  </NavLink>
                :<NavLink to= '/join' style={{color:'var(--color2)'}}>
                  <SlUser size={20}/>
                </NavLink>
              }
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}



function SearchBox({searchOpen,setSearchOpen,search,setSearch}) {

  const handleClose = () => setSearchOpen(false);

  const attributes = {
    value:search,
    onChange:(e)=>setSearch(e.target.value),
    autoFocus:true,
    type:'search'
  }

  return (
    <div className='client-search-wrapper'>
    
      <Modal
        show={searchOpen}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        style={{borderRadius:'100px !important' }}
        className='custom-search-model'
      >
        <Modal.Body style={{borderRadius:'100px'}} className='custom-search-model-body'>
          <div className="search-wrapper">
            <Input attributes={attributes}/>
            <button><CiSearch/></button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Navbar