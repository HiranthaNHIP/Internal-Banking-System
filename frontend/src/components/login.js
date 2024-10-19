import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA
import Icon_Image from './assets/bank-image-icon.png';
import { loginUser } from '../api'; // Import the loginUser function from the API file
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext'; // Adjust the path if necessary

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [recaptchaToken, setRecaptchaToken] = useState(null); // State for recaptcha
    const { login } = useAuth(); // Use the login function from the context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Check if reCAPTCHA token is valid
            if (!recaptchaToken) {
                alert("Please complete the reCAPTCHA");
                return;
            }
            const userData = { username, password, recaptchaToken };
            const response = await loginUser(userData); // Pass the whole userData object
            // localStorage.setItem("token", response.data.token);
            login(response.data.token); // Call the login function with the received token
    
            // Decode the JWT token
            const decoded = jwtDecode(response.data.token);
            console.log(decoded.user.position);
            // Redirect based on role
            if (["Manager", "Assistant Manager"].includes(decoded.user.position)) {
                navigate('/manager', { state: { branch_name: decoded.user.branch_name, first_name: decoded.user.first_name } });
            } else if (["Clerk", "Teller"].includes(decoded.user.position)) {
                navigate('/main', { state: { branch_name: decoded.user.branch_name, first_name: decoded.user.first_name } });
            }
            
            console.log(decoded);
            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            // Extract a meaningful error message from the error object
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {/* image box */}
            <div className='relative w-1/2 h-full flex flex-col bg-orange-500 items-center justify-center'>
                <img src={Icon_Image} className='w-2/4 h-2/4' alt=''/>
            </div>

            {/* login access giving box */}
            <div className='w-1/2 h-full flex flex-col items-center justify-center font-sans antialiased'>
                <form className='flex flex-col justify-center items-center' onSubmit={handleLogin}>

                    <h1 className='text-[24pt] font-bold tracking-wider mb-9'>LOGIN</h1>

                    <div className='w-auto flex flex-col items-start my-5'>
                        <label className='text-[14pt] font-medium ml-2 mb-2'>Username</label>
                        <input 
                            className='w-[450px] h-[50px] bg-transparent text-[14pt] border-2 pl-4 rounded-full border-orange-500 outline-transparent hover:border-4'
                            type="text"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            onClick={clearErrorMessage}
                        />
                    </div>

                    <div className='w-auto flex flex-col items-start my-5'>
                        <label className='text-[14pt] font-medium ml-2 mb-2'>Password</label>
                        <input 
                            className='w-[450px] h-[50px] bg-transparent text-[14pt] border-2 pl-4 rounded-full border-orange-500 outline-transparent hover:border-4'
                            type="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={clearErrorMessage}
                        />
                    </div>

                    {/* ReCAPTCHA component */}
                    <div className='my-5'>
                        <ReCAPTCHA
                            sitekey="6Lei-icqAAAAALhWTl5D96p_EdARKSNDk2LBFnBV" // Replace with your actual site key
                            onChange={(value) => setRecaptchaToken(value)}
                        />
                    </div>

                    {/* Conditionally render the error message */}
                    {errorMessage && (
                        <p id='error_message' className='text-lg text-orange-500 font-medium ml-3'>
                            {errorMessage}
                        </p>
                    )}

                    <button className='w-[450px] h-[50px] border-2 bg-orange-500 border-orange-500 font-medium text-[16pt] rounded text-white mt-16 outline-none hover:border-2 hover:font-medium hover:border-orange-500 hover:text-orange-500 hover:bg-transparent' 
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;

