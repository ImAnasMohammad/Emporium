import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

const Cart = ({openCart,setOpenCart,items}) => {

    const handleClose = ()=> setOpenCart(false)

  return (
    <Offcanvas show={openCart} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos delectus doloribus voluptas quos iure deserunt sed eveniet nam qui, nobis reiciendis sequi a minima nulla, nihil aperiam quisquam at.
        </Offcanvas.Body>
      </Offcanvas>
  )
}

export default Cart