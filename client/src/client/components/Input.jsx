import React from 'react'

const Input = ({label,className='',attributes}) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
        <label>
            <div>{label}</div>
            <input {...attributes}/>
        </label>
    </div>
  )
}

export default Input