import React from 'react'
import Swal from 'sweetalert2'
import axios from '../../config/axios'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            department: '',
            departments: []
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            userName: this.state.username,
            email: this.state.email,
            department: this.state.department,
            password: this.state.password
        }
        // console.log(formData)
        axios.post('/users/register', formData)
            .then(response => {
                if(response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                      })
                } else if(response.data.hasOwnProperty('errmsg')) {
                    // console.log(response.data.errmsg)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Enter another credentials',
                      })
                } else {
                    // console.log(response.data, 'in else')
                    Swal.fire(
                    'Good job!',
                    'Successfully created account',
                    'success'
                    )
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
            })
    }
    handleDepChange = (e) => {
        this.setState({department: e.target.value})
    }
    componentDidMount() {
        axios.get('departments')
            .then(response => {
                const departments = response.data
                this.setState({departments})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
            })
    }
    render() {
        return(
            <div>
                <br />
                <h2 className = "text-xl-center">Register</h2>
                <br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control"  type="input" id="username" name="username" value={this.state.username} onChange={this.handleChange} /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input className="form-control"  type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />  
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <select className="form-control"  id="department" onChange={this.handleDepChange}>
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
                        <label htmlFor="password">Password</label>
                        <input className="form-control"  type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} /> 
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        )
    }
}

export default Register