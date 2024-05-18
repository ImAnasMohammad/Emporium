import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Modal from 'react-bootstrap/Modal';

const SearchLayout = ({search,handleSearch,handleClick,btnLabel,children}) => {
  const [show,setShow] = useState(false);
  const btn = {
    padding:'10px 0px !important'
  }
  const handleSortClick = ()=>setShow(prev=>!show);
  
  return (
    <>
          <Modal show={show} onHide={handleSortClick} style={{width:'100%'}}>
            <Modal.Header closeButton>
              <Modal.Title>Sort By</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
              <button variant="secondary" className='btn btn-secondary' onClick={handleSortClick}>
                Clear
              </button>
              <button variant="primary"  className='btn btn-primary' style={btn}onClick={handleSortClick}>
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
      <div className='search-layout-wrapper'>
          <SearchBar heading='Customers' handleSortClick={handleSortClick} handleClick={handleClick} btnLabel={btnLabel} value={search} handleChange={handleSearch}/>
      </div>
    </>
  )
}


export default SearchLayout