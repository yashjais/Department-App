const Department = require('../models/Department')

module.exports.list = (req, res) => {
    Department.find()
        .then(department => res.send(department))
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    if(req.user.role == 'admin') {
        const body = req.body
        const department = new Department(body)
        department.save()
            .then(dep => res.send(dep))
            .catch(err => res.send(err))
    } else {
        res.send('You don\'t have the authority to make department' )
    }
}