import React from 'react'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Request extends React.Component {
    constructor() {
        super()
        this.state = {
            requests: [],
            account: {}
        }
    }
    componentDidMount() {
        const getRequest = axios.get('/requests', {
            headers: {
                'x-auth': localStorage.getItem('authDepToken')
            }
        })
        const getAccount = axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('authDepToken')
            }
        })
        const promise = []
        promise.push(getRequest)
        promise.push(getAccount)
        Promise.all(promise)
            .then(res => {
                const requests = res[0].data
                const account = res[1].data
                this.setState({requests, account})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                  })
            })
    }
    handleClick = (obj) => {
        if(obj.reqUserId == this.state.account._id){
            // console.log(obj)
            axios.put(`/requests/${obj.id}`, {status: obj.status}, {
                headers: {
                    'x-auth': localStorage.getItem('authDepToken')
                }
            })
                .then(res => {
                    const requests = this.state.requests.filter(req => req._id != obj.id)
                    this.setState({requests})
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: err,
                      })
                })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not valid',
                text: 'You don\'t have access to modify this request',
              })
        }
    }
    render() {
        // console.log(this.state.account, this.state.requests)
        return(
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Requests</h2>
                <br />    
                {
                    this.state.requests == 0 ? <span style={{textAlign: 'center'}}>no request found</span> : 
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.requests.map((request, index) => {
                                return (
                                    request.status == 'pending' && (
                                    <tr key={request._id}>
                                    <td>#</td>
                                    <td>{request.message}</td>
                                    <td>{request.status}</td>
                                    <td><button className="btn btn-primary" onClick={() => this.handleClick({reqUserId: request.requestedUser._id, id: request._id, status: 'completed'})}>Approve</button></td>
                                    <td><button className="btn btn-danger" onClick={() => this.handleClick({reqUserId: request.requestedUser._id, id: request._id, status: 'rejected'})}>Reject</button></td>
                                    </tr>
                                    )
                                )
                            })
                        }
                    </tbody>
                    </table>
                   
                }
            </div>
        )
    }
}

export default Request