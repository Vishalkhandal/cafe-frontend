import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router';

function Products() {
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!loading && !isAuthenticated) {
            navigate("/login");
        }
    },[loading, isAuthenticated, navigate]);

    if (loading) return <p>Loading...</p>

    if(!user) return null;
    
    return (
        <>
            <div>Products Page.</div>
            <h1>Hi, Welcome to ${user.name}</h1>
        </>
    )
}

export default Products