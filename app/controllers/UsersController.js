const User = require('../models/User')
const _ = require('lodash')

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
            res.json(_.pick(user, ['_id', 'userName', 'email', 'role']))
        })
        .catch(err => {
            res.json(err)
        })
}
 
module.exports.account = function(req, res){
    const { user } = req
    res.send(_.pick(user, ['_id', 'userName', 'email']))
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
