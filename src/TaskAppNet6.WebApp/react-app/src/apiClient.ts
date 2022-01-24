import axios from 'axios'

// Set config defaults when creating the instance
export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});