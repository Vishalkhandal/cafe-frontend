import { BrowserRouter, Route, Router, Routes } from "react-router"
import { AuthProvider } from "../context/AuthContext"
import Home from "../pages/Home"
import Login from '../pages/Login'
import Register from "../pages/register"
import Profile from "../pages/Profile"
import ProtectedRoute from "../components/ProtectedRoute"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Dashboard from "../pages/Dashboard"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          <Route path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
