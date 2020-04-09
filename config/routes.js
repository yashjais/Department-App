const express = require('express')
const router = express.Router()

const authenticateUser = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/UsersController')
const departmentsController = require('../app/controllers/DepartmentsController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.get('/departments', authenticateUser, departmentsController.list)
router.post('/departments', authenticateUser, departmentsController.create)

module.exports = router