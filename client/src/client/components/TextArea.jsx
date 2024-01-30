import React from 'react'

const TextArea = ({label,value,setValue,required,name,row}) => {
  return (
    <div className="custom-input-wrapper">
        <label>
            <div>{label}</div>
            <textarea
                value={value}
                onChange={e=>setValue(e.target.value)}
                required={required}
                name={name}
                className='bg'
            ></textarea>
        </label>
    </div>
  )
}

export default TextArea