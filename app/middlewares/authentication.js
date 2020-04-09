const User = require('../models/User')

const authenticateUser = function(req, res, next) {
    // console.log('here')
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(function(user) {
            // console.log('calling next')
            if(user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({notice: 'token not available'})
            }
        })
        .catch(function(err) {
            res.status('401').send(err)
        })
}

module.exports = authenticateUser 