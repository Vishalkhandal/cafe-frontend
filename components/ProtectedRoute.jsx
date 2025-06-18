import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

function ProtectedRoute({ children, redirectTo = "/login" }) {
    const { isAuthenticated } = useAuth()
    
    if(!isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }
    return (
        children ? children : <Outlet />    
  )
}

export default ProtectedRoute   