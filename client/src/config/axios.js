import Axios from 'axios'

const axios = Axios.create({
    // baseURL: '/'
    baseURL: 'http://localhost:3020'
})

export default axios