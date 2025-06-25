import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    return isAuthenticated ? (
        <>
            <div className='flex flex-col min-h-screen'>
                <Outlet />
            </div >
        </>
    ) : <Navigate to="/" />;
};

export default ProtectedRoute;