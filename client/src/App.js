import React, { useState } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import axios from './config/axios'
import SocketContext from './socket-context'

import Home from './Home'
import Form from './Form'

import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Account from './components/Users/Account'

import Request from './components/Requests/Request'
import Requests from './components/Requests/Requests'

import NotificationShow from './components/Notifications/Show'

function AppSocket(props) {
    const [notification, setNotification] = useState([])

    props.socket.on('modify_request', function(request) {
        setNotification([...notification, request])
        // console.log(' modify request ', request)
    })
    
    props.socket.on('create_request', function(request) {
        setNotification([...notification, request])
        // console.log(' create request ', request)
    })
    // console.log('in props', props, window.history)
    const handleLogout = () => {
      axios.delete('/users/logout', { 
        headers: {
          'x-auth': localStorage.getItem('authDepToken')
        }
      })
        .then(res => {
        //   console.log(res.data)
          localStorage.removeItem('authDepToken')
          window.location.href = "/"
        })
        .catch(err => alert(err))
    }
    const notiHandleClick = () => {
        // console.log('clicked')
    }
    
    return (
        <div className="container">
            <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Department App</span>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                           localStorage.getItem('authDepToken') ? (
                                <React.Fragment> 
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/form">Form</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/requests/pending">Pending</Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/requests/approved">Approved</Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/requests/rejected">Rejected</Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/requests">Request(for Approval)</Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/account"> Account </Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="#" onClick={handleLogout}> Logout </Link>
                                    </li>
                                    <li className="nav-item active">
                                    <Link to={{
                                        pathname: "/notification",
                                        state: notification
                                    }}><button type="button" className="btn btn-primary" onClick={notiHandleClick}>
                                    Notification <span className="badge badge-light">{notification.length}</span>
                                    <span className="sr-only">unread messages</span>
                                    </button></Link>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item active">
                                        <Link  className="nav-link" to="/"> Home </Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/login"> Login </Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/register"> Register </Link>  
                                    </li>
                                    
                                </React.Fragment>
                            )
                        }            
                    </ul>
                </div>
            </nav>
                    
            <Route path="/" component={Home} exact={true} />
            <Route path="/form" component={Form} exact={true} />

            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/account" component={Account} exact={true} />

            <Route path="/requests" component={Request} exact={true}/>
            <Route path="/requests/pending" component={Requests} />
            <Route path="/requests/approved" component={Requests}  />
            <Route path="/requests/rejected" component={Requests}  />

            <Route path="/notification" component={NotificationShow} />

            </BrowserRouter>
        </div>
    )
}

const App = props => (
    <SocketContext.Consumer>
    {socket => <AppSocket {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
    
export default App
