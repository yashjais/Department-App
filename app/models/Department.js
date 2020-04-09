const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        _id: {
            type: Schema.Types.ObjectId,
        },
        userName: {
            type: String,
        },
        email: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department