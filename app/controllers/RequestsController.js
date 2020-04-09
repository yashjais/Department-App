const Request = require('../models/Request')

module.exports.list = (req, res) => {
    Request.find({user: req.user._id}).populate('user', ['userName', 'email', 'department']).populate('requestedUser', ['userName', 'email', 'department'])
        .then(request => res.send(request))
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    body.user = req.user._id
    // res.send(body)
    const request = new Request(body)
    request.save()
        .then(request => res.send(request))
        .catch(err => res.send(err))
}