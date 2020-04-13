const express = require('express');
const app = express();
const io = require('./socket')
const cors = require('cors')

app.use(express.json())
app.use(cors())
const path = require('path') 
const dirPath = __dirname.replace('\config', '')
app.use(express.static(path.join(dirPath,"client/build"))) 

module.exports = app 