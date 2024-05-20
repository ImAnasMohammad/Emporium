import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const SideBar = ({children,page}) => {
  const [isOpen,setIsOpen] = useState(false);

  const items = [
    {
      icon:'bi bi-grid',
      to:'/admin/dashboard',
      label:'Dashboard'
    },
        {
      icon:'bi bi-people',
      to:'/admin/customers',
      label:'Customers'
    },
    {
      icon:'bi bi-clipboard',
      to:'/admin/orders',
      label:'orders'
    },

    {
      icon:'bi bi-columns-gap',
      to:'/admin/categories',
      label:'Categories'
    },
    {
      icon:'bi bi-box',
      to:'/admin/inventory',
      label:'Inventory'
    },
    {
      icon:'bi bi-hand-thumbs-up',
      to:'/admin/feedbacks',
      label:'Feedbacks'
    },
    {
      icon:'bi bi-gear',
      to:'/admin/settings',
      label:'Settings'
    },
  ]

  return (
<div className='slide-bar-wrapper'>
  <header className={`header ${isOpen && 'body-pd'}`}>
    <div className={`header_toggle`}> <i className="bi bi-list" onClick={()=>setIsOpen(prev=>!prev)} /> </div>
    <h3>{page}</h3>
    <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt /> </div>
  </header>
  <div className={`l-navbar ${isOpen && 'show-custom-slide-box-emp'}`}>
    <nav className="nav">
      <div>
        <div className="nav_list">
          {
            items?.map((item,index)=><NavLink key={index} className="nav_link" to={item?.to} activeClass='active'>
                <i className={`${item?.icon} nav_icon`} />
                <span className="nav_name">{item?.label}</span>
            </NavLink>
            )
          }
        </div>
      </div>
      <NavLink className="nav_link" to='/admin/sign-out' activeClass='active'>
        <i class="bi bi-box-arrow-right nav_icon"></i>
        <span className="nav_name">SignOut</span>
      </NavLink>
    </nav>
  </div>
  <div className=" bg-light">
          {
            children
          }
  </div>
</div>


  )
}

export default SideBar