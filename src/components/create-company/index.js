import React, { useState, useEffect } from 'react'
import Input from '../common/input'
import Select from '../common/select'
import Table from '../common/table'
import api from '../../api'

const CreateCompany = ({ companies, setCompanies, setSuccess }) => {
  const [companyName, setCompanyName] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [employees, setEmployees] = useState([])

  function addCompany () {
    api.newCompany({ name: companyName }).then(json => {
      setSuccess(json.success)
      setCompanyName('')
      setCompanies(json.newCompany)
    })
  }

  function getCompanyEmployees (company) {
    setSelectedCompany(company)
    api.getCompanyEmployees({ company }).then(json => {
      setEmployees(json.employees)
    })
  }

  function unassignEmployee (id, company) {
    api.unassignEmployee({ id, company }).then(json => {
      setSuccess(json.success)
      setEmployees(
        [...employees].map(emp =>
          id === emp.id ? { ...emp, company: '' } : emp
        )
      )
    })
  }
  return (
    <div>
      <h2>Lägg till företag</h2>
      <Input
        label='Företagsnamn: '
        name='companyName'
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
      />
      <button
        disabled={!companyName}
        onClick={() => addCompany()}
        type='button'
      >
        Lägg till företag
      </button>
      <h2>Visa anställda för företag</h2>
      <Select
        selectedCompany={selectedCompany}
        name='selectCompany'
        label='Välj företag: '
        arr={companies}
        arrProperty='name'
        onChange={e => getCompanyEmployees(e.target.value)}
      />
      <Table
        head={['Namn', 'Val']}
        content={employees.map(employee => {
          return (
            <tr key={employee.id}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>
                {employee.company ? (
                  <button
                    onClick={() =>
                      unassignEmployee(employee.id, employee.company)
                    }
                    type='button'
                  >
                    Ta bort från företag
                  </button>
                ) : (
                  'Borttagen från företaget'
                )}
              </td>
            </tr>
          )
        })}
      />
    </div>
  )
}

export default CreateCompany
