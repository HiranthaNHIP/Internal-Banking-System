import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Main from './components/main';
import Manager from './components/managerMain';
import { useAuth } from './context/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Correct import

const isTokenExpired = (token) => {
    if (!token) return true; // No token means expired
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime; // Check if expired
};

const ProtectedRoute = ({ element, allowedRoles, redirectTo }) => {
    const { user } = useAuth();
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Check if the user is logged in and if the token is valid
    if (!user || isTokenExpired(token)) {
        localStorage.removeItem('token'); // Remove the expired token
        return <Navigate to="/" />; // Redirect to login if not logged in or token is expired
    }

    // Check if the user has the allowed role
    if (allowedRoles && !allowedRoles.includes(user.position)) {
        return <Navigate to={redirectTo} />; // Redirect to specified allowed route if role is not allowed
    }

    return element; // Render the protected element if all checks pass
};

function App() {
    const navigate = useNavigate(); // Get the navigate function from the router
    const { user } = useAuth();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (isTokenExpired(token)) {
                localStorage.removeItem('token'); // Remove the expired token
                navigate('/'); // Redirect to login
            }
        };

        // Check token expiration every second
        const intervalId = setInterval(checkTokenExpiration, 1000); // 1000ms = 1 second

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [navigate, user]); // Add dependencies to the useEffect hook

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route 
                path="/main" 
                element={
                    <ProtectedRoute 
                        element={<Main />} 
                        allowedRoles={['Clerk', 'Teller']} 
                        redirectTo="/main" 
                    />
                } 
            />
            <Route 
                path="/manager" 
                element={
                    <ProtectedRoute 
                        element={<Manager />} 
                        allowedRoles={['Manager', 'Assistant Manager']} 
                        redirectTo="/manager" 
                    />
                } 
            />
        </Routes>
    );
}

export default App;
