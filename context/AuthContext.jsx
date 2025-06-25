import { useState, useEffect, useContext, createContext } from "react"
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    const registerUser = async (name, email, address, password) => {
        const url = "http://localhost:3000/api/auth/register"
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, address, password })
            })

            const json = await response.json();
            if (!response.ok) {
                setMessage({
                    msg: json.msg,
                    status: response.status,
                    statusText: response.statusText
                });
                throw new Error(`Response status: ${response.status} and msg: ${response.statusText}`)
            }
            setMessage(null);
            alert("User registered successfully!");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async (email, password) => {
        const url = "http://127.0.0.1:3000/api/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json();

            localStorage.setItem("token", data.token);

            if (!response.ok) {
                setMessage({
                    msg: data.msg,
                    status: response.status,
                    statusText: response.statusText
                })
                throw new Error(`Response status: ${response.status} and msg: ${response.statusText}`);
            }

            setMessage(null);
            alert("User Login successfully!");
            await getUser();
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    }

    const logoutUser = async () => {
        const url = "http://localhost:3000/api/auth/logout";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })
            const data = await response.json();

            if (!response.ok) {
                setMessage({
                    msg: data.msg,
                    status: response.status,
                    statusText: response.statusText
                })
                throw new Error(`Response status: ${response.status} and msg: ${response.statusText}`);
            }

            localStorage.removeItem("token");
            setMessage(null);
            setUser(null);
            setIsAuthenticated(false);
            alert("User Logout successfully!");
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error)
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();
            console.log("getUser data:", data);
            setUser(data);
            setIsAuthenticated(true);
            
        } catch (error) {
            console.warn("getUser error:", error.message);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ registerUser, loginUser, logoutUser, getUser, user, isAuthenticated, loading, message }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);