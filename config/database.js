const mongoose = require('mongoose')
const setUpDB = () => {
    mongoose.connect('mongodb+srv://yashjais:Pengu123@cluster0-mxqsz.mongodb.net/Dep?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true, useFindAndModify: false })
        .then(response => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log('here', err)
        })

}

module.exports = setUpDB 