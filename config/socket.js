const socket = require('socket.io')
const server = require('./server')

const io = socket(server)

io.on('connection', client => {
    client.on('tweet', event);
});  

module.exports = io