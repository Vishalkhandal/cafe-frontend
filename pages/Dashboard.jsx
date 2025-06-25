import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';

function Dashboard() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loading, !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate])
  
  if (loading) return <p>Loading...</p>

  if(!user) return <p>user not found</p>;

  return (
    <>
      <h1>Welcome to {user.name}</h1>
      <h2>User Id: {user.id || user._id}</h2>
      <h2>User Email: {user.email}</h2>
      <h2>User Address: {user.address}</h2>
      <h2>User Created At: {user.createdAt}</h2>
      <h2>User Updated At: {user.updatedAt}</h2>
    </>
  );
}

export default Dashboard