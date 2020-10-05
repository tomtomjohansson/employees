function post (body, route) {
  return fetch(`http://localhost:3000/${route}`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}

function get (route) {
  return fetch(`http://localhost:3000/${route}`, {
    method: 'GET'
  })
    .then(data => data.json())
    .catch(err => console.log(err))
}

const api = {
  newEmployee: body => post(body, 'new-employee'),
  getCompanyEmployees: body => post(body, 'get-employees-from-company'),
  newCompany: body => post(body, 'new-company'),
  unassignEmployee: body => post(body, 'remove-employee'),
  getUnassignedEmployees: () => get('get-unassigned-employees'),
  getCompanies: () => get('get-companies'),
  assignEmployee: body => post(body, 'assign-employee')
}

export default api
