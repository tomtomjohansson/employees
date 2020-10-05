const { readFile, writeFile } = require('./helpers/readWrite')
const { v4: uuidv4 } = require('uuid')

const routes = {
  getEmployeesFromCompany: (req, reply) => {
    const { company } = JSON.parse(req.body)
    const { employees } = readFile('./server/data/employees.json')
    reply.send({ employees: employees.filter(x => x.company === company) })
  },
  getCompanies: (req, reply) => {
    const { companies } = readFile('./server/data/companies.json')
    reply.send({ companies })
  },
  getUnassignedEmployees: (req, reply) => {
    const { employees } = readFile('./server/data/employees.json')
    reply.send({
      unassignedEmployees: employees.filter(employee => !employee.company)
    })
  },
  assignEmployee: (req, reply) => {
    const { company, id } = JSON.parse(req.body)
    const { employees } = readFile('./server/data/employees.json')
    const newEmployees = {
      employees: employees.map(x => (x.id === id ? { ...x, company } : x))
    }
    writeFile('./server/data/employees.json', newEmployees)
    reply.send({ success: `Personen registrerades som anställd på ${company}` })
  },
  removeEmployee: (req, reply) => {
    const { id, company } = JSON.parse(req.body)
    const { employees } = readFile('./server/data/employees.json')
    const newEmployees = {
      employees: employees.map(x => (x.id === id ? { ...x, company: '' } : x))
    }
    writeFile('./server/data/employees.json', newEmployees)
    reply.send({ success: `Personen togs bort som anställd på ${company}` })
  },
  newEmployee: (req, reply) => {
    const newEmployee = JSON.parse(req.body)
    newEmployee.id = uuidv4()
    const { employees } = readFile('./server/data/employees.json')
    const newEmployees = { employees: [...employees, newEmployee] }
    writeFile('./server/data/employees.json', newEmployees)
    reply.send({ success: 'Personen lades till' })
  },
  newCompany: (req, reply) => {
    const newCompany = JSON.parse(req.body)
    newCompany.id = uuidv4()
    const { companies } = readFile('./server/data/companies.json')
    const newCompanies = { companies: [...companies, newCompany] }
    writeFile('./server/data/companies.json', newCompanies)
    reply.send({ success: 'Företaget lades till', newCompany })
  },
  serveStatic: (req, reply) => {
    return reply.sendFile('index.html')
  }
}

module.exports = routes
