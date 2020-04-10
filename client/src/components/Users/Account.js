import React from 'react'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            account: {}
        } 
    }
    componentDidMount() {
        const promise = []
        const getUser = axios.get('/users/account', {
                            headers: {
                                'x-auth': localStorage.getItem('authDepToken')
                            }
                        })

        const getDep = axios.get('/departments')
        promise.push(getUser, getDep)
        Promise.all(promise)
            .then(res => {
                const account = res[0].data
                const departments = res[1].data
                const department = departments.find(dep => dep._id == account.department)
                account.department = department
                this.setState({account})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
                this.props.history.push('/')
            })
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}> User Info </h2>

                <br />
                <h4>Username - {this.state.account.userName}</h4>
                <h4>Email - {this.state.account.email}</h4>
                <h4>Department - {this.state.account.department && this.state.account.department.name}</h4>
                <h4>Role - {this.state.account.role}</h4>
            </div>
        )
    }
}

export default Account