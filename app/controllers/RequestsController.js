const Request = require('../models/Request')
// const socket = require('socket.io')
// const server = require('../../index')
// const io = socket(server)
// const io = require('../../index')

module.exports.list = (req, res) => { // requests will be searched on the basis of department
    Request.find({department: req.user.department}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department']).populate('department', ['name'])
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.show = (req, res) => { // requests will be searched on the basis of user
    // console.log('check user', req.user._id)
    Request.find({user: req.user._id}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department']).populate('department', ['name'])
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.showPending = (req, res) => { // requests will be searched on the basis of user
    Request.find({user: req.user._id, status: 'pending'}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department']).populate('department', ['name']).sort({createdAt: -1}).limit(5)
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.showApproved = (req, res) => { // requests will be searched on the basis of user
    Request.find({user: req.user._id, status: 'completed'}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department']).populate('department', ['name']).sort({createdAt: -1}).limit(5)
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.showRejected = (req, res) => { // requests will be searched on the basis of user
    Request.find({user: req.user._id, status: 'rejected'}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department']).populate('department', ['name']).sort({createdAt: -1}).limit(5)
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    body.user = req.user._id
    if(req.user.department == body.department){ // only requests that belong to users with other dep can be made
        res.send('You can\'t request to user within same department')
    } else {
        const request = new Request(body)
        request.save()
            .then(request => {
                
                res.send(request)

            })
            .catch(err => res.send(err))
    }
}

module.exports.update = (req, res) => {
    const body = req.body
    const _id = req.params.id
    console.log(_id)
    Request.findOne({_id})
        .then(request => {
            if(request) {
                if(("" + request.requestedUser) == ("" + req.user._id)) { // request can only be modified by the requested user only
                    request.status = body.status
                    return request.save()
                } else {
                    console.log(req.user._id)
                    console.log(request.requestedUser)
                    console.log()
                    res.send('you can\'t modify the status of this request')
                }
            } else {
                res.send({})
            }
        })
        .then(request => res.send(request))
        .catch(err => res.send(err))
}