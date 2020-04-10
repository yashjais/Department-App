const express = require('express')
const router = express.Router()

const authenticateUser = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/UsersController')
const departmentsController = require('../app/controllers/DepartmentsController')
const requestsController = require('../app/controllers/RequestsController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.get('/departments', departmentsController.list) // can be accessed by all - only department name are given
router.get('/departments-all', authenticateUser, departmentsController.listAll) // can be accessed by all authenticated users
router.post('/departments', authenticateUser, departmentsController.create)

router.get('/requests', authenticateUser, requestsController.list) // search via department
router.get('/requests-individual', authenticateUser, requestsController.show) // search via user - all the req
router.get('/requests/pending', authenticateUser, requestsController.showPending) // search via user - req that are pending
router.get('/requests/approved', authenticateUser, requestsController.showApproved) // search via user - req that are approved
router.get('/requests/rejected', authenticateUser, requestsController.showRejected) // search via user - req that are rejected
router.post('/requests', authenticateUser, requestsController.create)
router.put('/requests/:id', authenticateUser, requestsController.update)

module.exports = router