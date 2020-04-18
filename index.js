const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const path = require('path')
const socket = require('socket.io')

const port = process.env.PORT || 3020
const app = express()

setUpDB() 


// const corsOptions = {
//     exposedHeaders: 'x-auth',
// };
// app.use(cors(corsOptions))
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }, credentials: true
  }

app.use(cors(corsOptions))

app.use(express.json())
app.use('/', router)

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

const server = app.listen(port, () => {
    console.log('listening on the port', port)
})

module.exports = server

const io = socket(server)

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('create_request', function(data){
      console.log('in backend', data)
      io.emit('create_request', data)
    })
    socket.on('modify_request', function(data){
      console.log('in backend',data)
      io.emit('modify_request', data)
    })
});
module.exports = io  