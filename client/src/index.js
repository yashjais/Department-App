import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import io from 'socket.io-client';
import SocketContext from './socket-context'

const socket = io.connect('http://localhost:3020')

const NewApp = props => (
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>
)

const rootHandle = document.getElementById('root')

ReactDOM.render(<NewApp />, rootHandle)
