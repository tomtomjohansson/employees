import React from 'react'

const Input = ({ name, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default Input
