import React, { useState, useEffect } from 'react'
import Select from '../common/select'
import Table from '../common/table'
import api from '../../api'

const LinkEmployee = ({ companies, setSuccess }) => {
  const [unassignedEmployees, setunassignedEmployees] = useState([])

  useEffect(() => {
    api.getUnassignedEmployees().then(json => {
      setunassignedEmployees(json.unassignedEmployees)
    })
  }, [])

  function setToCompany (id, company) {
    setunassignedEmployees(
      [...unassignedEmployees].map(emp =>
        emp.id === id ? { ...emp, company } : emp
      )
    )
  }

  function assignEmployee (id, company) {
    api.assignEmployee({ id, company }).then(json => {
      setSuccess(json.success)
      setunassignedEmployees(
        [...unassignedEmployees].map(emp =>
          id === emp.id ? { ...emp, assigned: true, company } : emp
        )
      )
    })
  }
  return (
    <div>
      <Table
        head={['Namn', 'Företag', 'Länka']}
        content={unassignedEmployees.map(employee => {
          return (
            <tr key={employee.id}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>
                {employee.assigned ? (
                  '-'
                ) : (
                  <Select
                    selectedCompany={employee.company}
                    name='selectCompany'
                    label='Välj företag: '
                    arr={companies}
                    arrProperty='name'
                    onChange={e => setToCompany(employee.id, e.target.value)}
                  />
                )}
              </td>
              <td>
                {employee.assigned ? (
                  `Personen är tillagd till ${employee.company}`
                ) : (
                  <button
                    disabled={!employee.company}
                    onClick={() =>
                      assignEmployee(employee.id, employee.company)
                    }
                    type='button'
                  >
                    Koppla till företag
                  </button>
                )}
              </td>
            </tr>
          )
        })}
      />
    </div>
  )
}

export default LinkEmployee
