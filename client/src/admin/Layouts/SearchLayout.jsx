import React, { useState } from 'react'
// import SearchBar from '../components/SearchBar'
import Modal from 'react-bootstrap/Modal';

const   SearchLayout = (
  {
    search,
    setSearch,
    handleSearchClick,
    handleSortClick,
    handleCreateClick,
    btnLabel,
    children
  }
) => {
  const [show,setShow] = useState(false);
  const toggleSortModel = ()=>setShow(prev=>!show);
  
  return (
    <>
      <SortModel
        show={show}
        toggleSortModel={toggleSortModel}
        handleSortClick={handleSortClick}
      >
        {children}
      </SortModel>
      <div className='search-layout-wrapper'>
        <div style={{display:'flex',gap:'10px'}}>
          <div className='search-bar-wrapper'>
              <i class="bi bi-search"></i>
              <input type="text"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  placeholder='Search'
                  />
          </div>
          <button onClick={toggleSortModel} className='custom-primary-btn add-btn' ><i class="bi bi-filter-left"></i>Sort</button>
          <button onClick={handleCreateClick} className='custom-primary-btn add-btn' ><i class="bi bi-plus"></i>{btnLabel}</button>
        </div>
      </div>
    </>
  )
}



const SortModel = ({children,show,toggleSortModel,handleSortClick})=>{
  
  const handleClick = ()=>{
    handleSortClick();
    toggleSortModel()
  }

  return <Modal show={show} onHide={toggleSortModel} style={{width:'100%'}}>
    <Modal.Header closeButton>
      <Modal.Title>Sort By</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <button variant="secondary" className='btn btn-secondary' onClick={toggleSortModel}>
        Clear
      </button>
      <button
        variant="primary"  
        className='btn btn-primary' 
        style={{padding:'10px 0px !important'}}
        onClick={handleClick}
      >
        Sort
      </button>
    </Modal.Footer>
  </Modal>
}

export default SearchLayout