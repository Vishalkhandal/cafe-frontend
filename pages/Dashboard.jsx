import React from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const {getUser} = useAuth();
  const handleClick = () => {
    return getUser();
  }
  return (
    <>
    <div>Dashboard</div>
    <h1>Click Get User button to get the user data</h1>
    <button onClick={handleClick} className='bg-red-900 px-2 py-2 text-white rounded'>Get User</button>
    </>
  )
}

export default Dashboard