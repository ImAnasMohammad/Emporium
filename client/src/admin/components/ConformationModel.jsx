import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ConformationModel = ({heading,content,handleClick,label='',show,setShow}) => {
  return (
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" style={{padding:'4px'}}onClick={()=>setShow(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleClick}>
            {label}
          </button>
        </Modal.Footer>
      </Modal>
  )
}

export default ConformationModel