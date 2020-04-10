const mongoose = require('mongoose')
const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/department-websocket', { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true, useFindAndModify: false })
        .then(response => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log(err)
        })

}

module.exports = setUpDB