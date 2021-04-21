import axios from 'axios'


if (process.env.NODE_ENV !== 'production') {
    var baseURL = 'http://localhost:3333/'
} else {
    var baseURL = process.env.API
}

export const api = axios.create({
    baseURL
})