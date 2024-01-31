import React from 'react'

const Input = ({label,type,value,setValue,required,name,className=''}) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
        <label>
            <div>{label}</div>
            <input
                type={type}
                value={value}
                onChange={e=>setValue(e.target.value)}
                required={required}
                name={name}
            />
        </label>
    </div>
  )
}

export default Input