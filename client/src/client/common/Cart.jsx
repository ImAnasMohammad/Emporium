import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

const Cart = ({openCart,setOpenCart,items}) => {

    const handleClose = ()=> setOpenCart(false)

  return (
    <Offcanvas show={openCart} onHide={handleClose} placement='end' scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
  )
}

export default Cart