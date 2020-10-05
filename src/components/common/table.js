import React from 'react'

const Table = ({ head, content }) => {
  return (
    <table>
      <thead>
        <tr>
          {head.map(th => {
            return <th key={th}>{th}</th>
          })}
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  )
}

export default Table
