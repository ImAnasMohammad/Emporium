import React from 'react'

const Input = (
    {
      label,
      className='',
      ...inputAttributes
      
    }
  ) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
        <label>
            <div>{label}</div>
            <input {...inputAttributes}/>
        </label>
    </div>
  )
}

export default Input