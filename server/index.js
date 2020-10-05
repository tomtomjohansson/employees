const fastify = require('fastify')({
  logger: true
})
const path = require('path')
const routes = require('./routes')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'dist')
})

fastify.addHook('onRequest', (req, reply, next) => {
  reply.header('Access-Control-Allow-Origin', '*')
  next()
})

fastify.post('/get-employees-from-company', routes.getEmployeesFromCompany)
fastify.get('/get-companies', routes.getCompanies)
fastify.get('/get-unassigned-employees', routes.getUnassignedEmployees)
fastify.post('/assign-employee', routes.assignEmployee)
fastify.post('/remove-employee', routes.removeEmployee)
fastify.post('/new-employee', routes.newEmployee)
fastify.post('/new-company', routes.newCompany)
fastify.get('/', routes.serveStatic)
fastify.get('/link-employee', routes.serveStatic)
fastify.get('/create-company', routes.serveStatic)

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
