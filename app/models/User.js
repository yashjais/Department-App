const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: function(value) {
                return validator.isAlphanumeric(value)
            },
            message: function() {
                return 'username format is not valid'
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'email format is invalid'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    role: {
        type: String,
        default: 'simple',
    }
})

// our own static method
userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    // example of triple return
    return User.findOne({ email })
        .then(function (user) {
            if (!user) {
                return Promise.reject('invalid email / password')
            } else {
                // console.log(user)
                return bcryptjs.compare(password, user.password)
                    .then(function (result) {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject('invalid email / password')
                        }
                    })
                    .catch(function (err) {
                        return Promise.reject(err)
                    })
            }
        })
        .catch(err => {
            return Promise.reject(err)
            // return new Promise(function(resolve, reject) {
            // reject (err)
            // })
        })
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt123@')
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token // should be in the single quote 
    })
}

// our own instance method
userSchema.methods.generateToken = function () {
    const user = this
    // console.log('in instance method', user)
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
        // role: "admin" // role: "customer"
    }
    const token = jwt.sign(tokenData, 'jwt123@')
    user.tokens.push({ token })
    return user.save()
        .then(function (user) {
            return Promise.resolve(token)
        })
        .catch(function (err) {
            return Promise.reject(err)
        })
}

// pre hooks
userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword => {
                        user.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User