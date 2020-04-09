const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')

const port = 3020
const app = express()

setUpDB() 

app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log('listening on the port', port)
})