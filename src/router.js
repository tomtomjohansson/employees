import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CreateCompany from './components/create-company'
import CreateEmployee from './components/create-employee'
import LinkEmployee from './components/link-employee'
import api from './api'

const Routes = ({ style }) => {
  const successRef = useRef(null)
  const [companies, setCompanies] = useState([])
  const [successMessage, setSuccessMessage] = useState('asdfasdf')

  useEffect(() => {
    api.getCompanies().then(json => {
      setCompanies(json.companies)
    })
  }, [])

  function addNewCompany (newCompany) {
    setCompanies([...companies, newCompany])
  }

  function setSuccess (message) {
    setSuccessMessage(message)
    successRef.current.classList.add(style.successShow)
    setTimeout(() => {
      successRef.current.classList.remove(style.successShow)
      setSuccessMessage('')
    }, 2500)
  }

  return (
    <Router>
      <div>
        <nav>
          <Link to='/'>Skapa person</Link>
          <Link to='/create-company'>Skapa företag</Link>
          <Link to='/link-employee'>Länka anställd</Link>
        </nav>
        <Switch>
          <Route path='/create-company'>
            <CreateCompany
              companies={companies}
              setCompanies={company => addNewCompany(company)}
              setSuccess={setSuccess}
            />
          </Route>
          <Route path='/link-employee'>
            <LinkEmployee companies={companies} setSuccess={setSuccess} />
          </Route>
          <Route path='/'>
            <CreateEmployee companies={companies} setSuccess={setSuccess} />
          </Route>
        </Switch>
      </div>
      <div ref={successRef} className={style.successContainer}>
        <p>{successMessage}</p>
      </div>
    </Router>
  )
}

export default Routes
