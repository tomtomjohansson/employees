import React from 'react'

const Select = ({
  name,
  label,
  arr,
  arrProperty,
  onChange,
  selectedCompany
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select value={selectedCompany} onChange={onChange} name={name}>
        <option value='' disabled>
          Gör ditt val
        </option>
        {arr.map(item => {
          return (
            <option key={item.id} value={item[arrProperty]}>
              {item[arrProperty]}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
