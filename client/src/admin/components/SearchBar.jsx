import React from 'react'

const SearchBar = ({value,handleChange,handleClick,btnLabel,handleSortClick}) => {
  return (
    <div style={{display:'flex',gap:'10px'}}>
      <div className='search-bar-wrapper'>
          <i class="bi bi-search"></i>
          <input type="text"
              value={value}
              onChange={handleChange}
              placeholder='Search'
              />
      </div>
      <button onClick={handleSortClick} className='custom-primary-btn add-btn' ><i class="bi bi-filter-left"></i>Sort</button>
      <button onClick={handleClick} className='custom-primary-btn add-btn' ><i class="bi bi-plus"></i>{btnLabel}</button>
    </div>
  )
}

export default SearchBar