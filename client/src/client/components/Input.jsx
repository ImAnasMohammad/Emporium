import React from 'react'

const Input = (
    {
      label,
      className='',
      type,
      value,
      onChange,
      required=false,
      reference=null,
      disabled=false,
      autoFocus=false,
      extraAttributes
      
    }
  ) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
        <label>
            <div>{label}</div>
            <input
              type={type}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              autoFocus={autoFocus}
              ref={reference}
              {...extraAttributes}
            />
        </label>
    </div>
  )
}

export default Input