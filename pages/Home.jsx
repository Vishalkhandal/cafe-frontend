import { useAuth } from "../context/AuthContext"

function Home() {
    const {loading} = useAuth();
    
    if(loading) return <p>Loading...</p>
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <h1>Welcome to Home Page.</h1>
            </div>
        </>
    )
}

export default Home