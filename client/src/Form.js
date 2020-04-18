import React from 'react'
import axios from './config/axios'
import Swal from 'sweetalert2'
import SocketContext from './socket-context'

class FormSocket extends React.Component{
    constructor() {
        super()
        this.state = {
            account: {},
            departments: [],
            department: '',
            message: '',
            users: [],
            user: '',
        }
    }
    componentDidMount() {
        const getUser = axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('authDepToken')
            }
        })
        const getDeps = axios.get('/departments-all', {
            headers: {
                'x-auth': localStorage.getItem('authDepToken')
            }
        })
        const promise = []
        promise.push(getUser)
        promise.push(getDeps)
        Promise.all(promise)
            .then(res => {
                const account = res[0].data
                const departments = res[1].data
                this.setState({account, departments})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {}
        if(this.state.user && this.state.department && this.state.message) {
            formData.requestedUser = this.state.user
            formData.message = this.state.message
            formData.department = this.state.department
            axios.post('/requests', formData, {
                headers: {
                    'x-auth': localStorage.getItem('authDepToken')
                }
            })
                .then(res => {
                    if(res.data != "You can't request to user within same department"){
                        // console.log('in if', res)
                        // console.log(this.state)
                        const request = res.data
                        // console.log('in creating req front end', request)
                        this.props.socket.emit('create_request', request)
                        Swal.fire(
                            'Good job!',
                            'Request has been made',
                            'success'
                        )
                        this.setState({message: ''})
                    } else {
                        // console.log('in else', res)
                        // console.log(this.state)
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Request',
                            text: res.data,
                          })
                          this.setState({message: ''})
                    }
                })
                .catch(err => {
                    // console.log('in err', err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: err,
                      })
                })
        } else {
            // console.log('in error of valid values', this.state)
            Swal.fire({
                icon: 'error',
                title: 'Please enter valid values',
                text: 'Fill All the values',
              })
        }
    }
    handleDropChange = (e) => {
        // console.log(e.target.id)
        if(e.target.id == "department"){
            const department = e.target.value
            const users = this.state.departments.find(dep => dep._id == department).users
            // console.log(users, department)
            this.setState({department, users})
        } else {
            this.setState({user: e.target.value})
        }
    }
    handleChange = (e) => {
        this.setState({message: e.target.value})
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Form</h2>
                <br />
                
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Created By: {this.state.account.userName}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select className="form-control" id="department" onChange={this.handleDropChange}>
                        <option value="">select</option>
                        {
                            this.state.departments.map(department => {
                                return (
                                    <option key={department._id} value={department._id}>{department.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <select className="form-control"  id="user" onChange={this.handleDropChange}>
                        <option value="">select</option>
                        {
                            this.state.users.map(user => {
                                return (
                                    <option key={user._id} value={user._id}>{user.userName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <input className="form-control"  type="input" id="message" name="message" value={this.state.message} onChange={this.handleChange} /> 
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

const Form = props => (
    <SocketContext.Consumer>
        {socket => <FormSocket {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default Form