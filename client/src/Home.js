import React from 'react'

function Home() {
    return (
        <div style={{textAlign: 'center'}}>
            <br />
            <h2>Welcome to this Website</h2>
            <br />
            <b>This site is made using MERN stack. This site has user-authentication. A particular user belong to a Department. A user can request to other user but that user should belong to different Department. All the user from a Department can see a request, but only the intended user can accept or reject the request.</b>
        </div>
    )
}

export default Home