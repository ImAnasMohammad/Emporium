import React from 'react'

const Input = (
    {
      label,
      className='',
      reference,
      ...inputAttributes
      
    }
  ) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
        <label>
            <div>{label}</div>
            <input {...inputAttributes} ref={reference}/>
        </label>
    </div>
  )
}

export default Input