import { useState, useEffect, useContext, createContext } from "react"
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('accessToken');
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
            console.log(json);

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
            navigate('/');
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
                body: JSON.stringify({ email, password }),
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
            setMessage(null);
            if (!data) {
                navigate('/login');
            } else {
                console.log("response data on loginUser", data);
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                alert("User Login successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/login');
    }

    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken');

        fetch('http://localhost:3000/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Protected data:", data);
            })
            .catch(err => {
                console.error("Unauthorized or error:", err);
            });

    }

    return (
        <AuthContext.Provider value={{ registerUser, loginUser, logoutUser, isAuthenticated, user, message, loading, getUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);