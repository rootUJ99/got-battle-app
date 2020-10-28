import React from 'react'
import './styles.css';
const Input = ({name, onChange, value, placeholder}) => {
  return (
      <input 
        name={name} 
        onChange={onChange} 
        value={value} 
        placeholder={placeholder}
        className='input'
      />
  )
}

export default Input;
