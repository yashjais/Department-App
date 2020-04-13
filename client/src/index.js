import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import io from 'socket.io-client';
// const socket = new WebSocket('ws://localhost:3020');
// socket()
io()     

const rootHandle = document.getElementById('root')

ReactDOM.render(<App />, rootHandle)