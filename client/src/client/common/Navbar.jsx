import React, { useEffect, useRef, useState } from 'react'
import logo from "../assets/images/logo.jpeg";
import "../assets/css/common/navbar.css";

import Accordion from 'react-bootstrap/Accordion';

import { SlUser } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

import CommonModal from "./CommonModal";
import CommonOverlay from './CommonOverlay';

import Overlay from 'react-bootstrap/Overlay';
import Modal from 'react-bootstrap/Modal';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';
import Input from '../components/Input';


const Navbar = () => {

  const [isOpen,setIsOpen] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [search,setSearch] = useState('');
  const [searchOpen,setSearchOpen] = useState(false);

  // const [dataOnHover,setDataOnHover] = useState(false)
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleMouseOver=(e)=>{
    setTarget(e.target)
    setShow(true)
  }


  const handleMouseOut=(e)=>{
    setShow(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);


  return (
    <>
    <SearchBox searchOpen={searchOpen} setSearchOpen={setSearchOpen} search={search} setSearch={setSearch}/>
      <Cart openCart={openCart} setOpenCart={setOpenCart}/>
      <nav className='navbar'>
        <div onClick={()=>setIsOpen(prev=>!prev)}className={`nav-shadow-wrapper ${isOpen ? 'active' :''}`}></div>
        {/* {dataOnHover &&
              <CommonModal isOpen={dataOnHover} setIsOpen={setDataOnHover}>
                <div className='hover_menu'>
                  <ul>
                    <li>Hello</li>
                  </ul>
                  <ul>
                    <li>Hai</li>
                  </ul>
                  <ul>
                    <li>Bye</li>
                  </ul>
                </div>
                </CommonModal>
              } */}
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
            <li className='overlay_parent'>
              {isMobileDevice ? 
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header>Products</Accordion.Header> 
                <Accordion.Body>
                  <ul>
                    <li>
                      Hello
                    </li>
                    <li>
                      Hai
                    </li>
                    <li>
                      Hello
                    </li>
                  </ul>
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                :
              <Link to='/'
              onMouseOver={(e)=>handleMouseOver(e)}
              // onMouseOut={(e)=>handleMouseOut(e)}
              >Products</Link>}
              {show &&
              <div ref={ref} className='overlay_items'>      
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                
              >
                <Popover id="popover-contained">
                  <Popover.Body>
                  <div className='hover_menu'>
                    <div>
                  <ul>
                    <li>Hello</li>
                    <li>Hai</li>
                    <li>Bye</li>
                  </ul>
                  </div>
                  <div>
                  <ul>
                    <li>Hello</li>
                    <li>Hai</li>
                    <li>Bye</li>
                  </ul>
                  </div>
                  <div>
                  <ul>
                    <li>Hello</li>
                    <li>Hai</li>
                    <li>Bye</li>
                  </ul>
                  </div>
                </div>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
            }
            
            </li>
            <li>
              <NavLink  to='/about-us'>About us</NavLink>
            </li>
            <li>
              <NavLink to='/contact-us'>Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className='nav_icons'>
          <ul>
            <li>
              <NavLink to='/join' style={{color:'var(--color2)'}}><SlUser size={20}/></NavLink>
            </li>
            <li>
              <CiSearch onClick={()=>setSearchOpen(true)} size={25}/>
            </li>
            <li>           
                <BsHandbag onClick={()=>setOpenCart(true)} style={{cursor:'pointer'}} size={20}/>
            </li>
            <li onClick={()=>setIsOpen(prev=>!prev)} className='mobile-menu-icon'>
              {isOpen ?<RxCross2 size={25} />: <RiMenu2Line size={25} /> }
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}



function SearchBox({searchOpen,setSearchOpen,search,setSearch}) {

  const handleClose = () => setSearchOpen(false);

  return (
    <>
      <Modal
        show={searchOpen}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        style={{borderRadius:'100px !important' }}
      >
        <Modal.Body style={{borderRadius:'100px'}}>
          <div className="search-wrapper">
            <Input type={'search'} value={search} setValue={setSearch}/>
            <button><CiSearch/></button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar