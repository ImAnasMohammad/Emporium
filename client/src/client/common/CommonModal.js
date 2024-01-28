import React, { useEffect, useState } from 'react';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const CommonModal = ({
    isOpen,
    closeModal,
    closeOnOverlayClick,
    showCloseIcon,
    children,
    classNames,
    closeOnEsc,
    animationDuration,
    heading
}) => {
    console.log(".............isOpen",isOpen);
    console.log(".............isOpen 1",children);
    const [open,setOpen] = useState(isOpen)

    const handleClose=()=>{
        setOpen(false)
        if(closeModal){
            closeModal()
        }
    }

    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);
  return (
        <Modal
        open={open}
        onClose={() => handleClose()}
        animation={false}
        classNames={classNames}
        center
        showCloseIcon={showCloseIcon}
        closeOnEsc={closeOnEsc}
        animationDuration={animationDuration}
      >
        {children}
      </Modal>
  )
}

export default CommonModal