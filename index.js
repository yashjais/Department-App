const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const path = require('path')

const port = process.env.PORT || 3020
const app = express()

setUpDB() 

app.use(cors())

app.use(express.json())
app.use('/', router)

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port, () => {
    console.log('listening on the port', port)
})