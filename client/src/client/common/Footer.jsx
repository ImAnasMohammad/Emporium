import React from 'react'
import logo from "../assets/images/logo.jpeg";
import { IoIosArrowUp } from "react-icons/io";
import '../assets/css/layouts/footer.css'
import { Link } from 'react-router-dom';
import { FaYoutube,FaInstagramSquare,FaFacebook } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";


const Footer = () => {
  return (
    <footer>
        <div>
            <div className="logo-wrapper">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footer-item">
                <h3>INformation <span><IoIosArrowUp/></span></h3>
                <ul>
                    <li><Link>About us          </Link></li>
                    <li><Link to="/contact-us">Contact us</Link></li>
                    <li><Link>Refund policy     </Link></li>
                    <li><Link>terms and services</Link></li>
                </ul>
            </div>
            <div className="footer-item social">
                <h3>social links <span><IoIosArrowUp/></span></h3>
                <ul>
                    <li><FaYoutube className='social-icons youtube'/>        <Link to="youtube">  Youtube</Link></li>
                    <li><FaInstagramSquare className='social-icons insta'/><Link to="instagram">instagram</Link></li>
                    <li><FaFacebook className='social-icons facebook'/>       <Link to="facebook"> facebook</Link></li>
                </ul>
            </div>
            <div className="footer-item">
                <h3>CONTACT US <span><IoIosArrowUp/></span></h3>
                <ul>
                    <li><FiMail      className='social-icons'/><Link to="mailto:example@example.com">example@example.com</Link></li>
                    <li><BsTelephone className='social-icons'/><Link to="tel:+1234567890">+1234567890</Link></li>
                </ul>
            </div>
        </div>
        <div className='copy-rights-wrapper'>
            <p>© {new Date().getFullYear()} SV Emporium </p>
            <p>Website by <Link to="" className='web-developers-link'>Web developers</Link></p>
        </div>
    </footer>
  )
}



export default Footer