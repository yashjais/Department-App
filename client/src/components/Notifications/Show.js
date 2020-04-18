import React from 'react'

function NotificationShow(props){
    // console.log(props.location.state)
    return (
        <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Notifications</h2>
                <br />    
                {
                    props.location.state == 0 ? <span style={{textAlign: 'center'}}>no new notifications</span> : 
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
                            props.location && props.location.state.map((request, index) => {
                                return (
                                    <tr key={request._id}>
                                    <td>#</td>
                                    <td>{request.message}</td>
                                    <td>{request.status}</td>
                                    <td><button className="btn btn-primary" onClick={() => this.handleClick({reqUserId: request.requestedUser._id, id: request._id, status: 'completed'})}>Approve</button></td>
                                    <td><button className="btn btn-danger" onClick={() => this.handleClick({reqUserId: request.requestedUser._id, id: request._id, status: 'rejected'})}>Reject</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                   
                }
            </div>
    )
}

export default NotificationShow