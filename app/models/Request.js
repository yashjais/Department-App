const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    requestedUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed']
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request