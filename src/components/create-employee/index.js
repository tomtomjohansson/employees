import React, { useState } from 'react'
import Input from '../common/input'
import Select from '../common/select'
import api from '../../api'

const CreateEmployee = ({ companies, setSuccess }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')

  function addPerson () {
    api.newEmployee({ firstName, lastName, company }).then(json => {
      setSuccess(json.success)
      setFirstName('')
      setLastName('')
      setCompany('')
    })
  }
  return (
    <div>
      <Input
        label='Förnamn: '
        name='firstName'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <Input
        label='Efternamn: '
        name='lastName'
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <Select
        name='selectCompany'
        label='Välj företag: '
        arr={companies}
        arrProperty='name'
        onChange={e => setCompany(e.target.value)}
        selectedCompany={company}
      />
      <button
        disabled={!firstName || !lastName}
        onClick={() => addPerson()}
        type='button'
      >
        Lägg till person
      </button>
    </div>
  )
}

export default CreateEmployee
