import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Add a request interceptor to attach the JWT token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

import useAuthStore from './store/useAuthStore';

// Add a response interceptor to handle token expiration / 401 errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Automatically log out the user if the token is expired/invalid
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)

