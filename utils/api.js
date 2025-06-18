// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend API base URL
    withCredentials: true, // This is crucial for sending and receiving HttpOnly cookies
});

// Optional: Add an interceptor to handle token expiration/refresh if needed,
// though our backend directly handles refreshing if the access token is expired
// and a valid refresh token exists.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the access token expired (and the backend returned specific code)
        // and it's not a refresh token request itself
        if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops

            try {
                // Attempt to refresh the token
                await api.post('/auth/refresh-token');
                // Retry the original request with the new access token
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // If refresh fails, redirect to login or clear auth state
                localStorage.removeItem('isAuthenticated'); // Clear client-side indicator
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;