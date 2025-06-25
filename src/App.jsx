import { BrowserRouter, Route, Router, Routes } from "react-router"
import { AuthProvider } from "../context/AuthContext"
import Home from "../pages/Home"
import Login from '../pages/Login'
import Register from "../pages/register"
import ProtectedRoute from "../components/ProtectedRoute"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Dashboard from "../pages/Dashboard"
import Products from "../pages/Products"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
