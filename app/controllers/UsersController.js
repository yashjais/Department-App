const User = require('../models/User')
const _ = require('lodash')
const Department = require('../models/Department')

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password) // static method
        .then(function(user) {
            // console.log('before the generateToken')
            // user.generateToken()
            //     .then()
            //     .catch()
            return user.generateToken()
        })
        .then(function(token) {
            // console.log('after the generateToken', user, token)
            // res.setHeader('x-auth', token).send({}) 
            res.send({token})        
        })
        .catch(function(err) {
            res.send(err)
        })
}

module.exports.register = (req, res) => {
    const body = req.body 
    const user = new User(body)
    // console.log(user.isNew)
    user.save()
        .then(user => {
            // console.log(user.isNew)
            return Department.findOne({_id: user.department})
            // res.json(_.pick(user, ['_id', 'userName', 'email', 'role', 'department']))
        })
        .then(dep => {
            console.log('pushing', _.pick(user, ['_id', 'userName', 'email']))
            dep.users.push(_.pick(user, ['_id', 'userName', 'email']))
            return dep.save()
        })
        .then(dep => {
            console.log('dep', dep)
            res.send(user)
        })
        .catch(err => {
            res.json(err)
        })
}
 
module.exports.account = function(req, res){
    const { user } = req
    res.send(_.pick(user, ['_id', 'userName', 'email', 'role', 'department']))
}

module.exports.logout = function(req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token}}})
        .then(function() {
            res.send({ notice: 'Successfully logged out'})
        })
        .catch(function(err) {
            res.send(err)
        })
}
