import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGJmNzA3ZWFiNGNjZTFmZTdkYWU1NiIsImVtYWlsIjoidmljZWVAZ21haWwuY29tIiwiaWF0IjoxNjUzMzM5OTE5LCJleHAiOjE2NTM0MjYzMTl9.mI7HqBtNCrMAHb5IVcfOQ_O3WNHg1lM6-fXvdOO34ls"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
})