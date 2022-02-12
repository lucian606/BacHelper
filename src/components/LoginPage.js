import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";

export default function LoginPage() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            setError('Successfully logged in');
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setError('Wrong password');
            } else {
                setError('Failed to login');
            }
        }
    }
    
    return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
            <div className="text-center font-medium text-xl">Welcome to</div>
            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Studdy Buddy</div>
        </div>
        <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error !== '' &&
                    <div class="bg-red-100 border border-red-400 text-red-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong class="text-md xl:text-xl 2xl:text-2xl font-bold">Error: </strong>
                            <div class="text-md xl:text-xl 2xl:text-2xl sm:inline">{error}</div>
                        </div>
                    </div>
                }
                <div>
                    <label className="text-sm xl:text-xl 2xl:text-2xl font-bold text-gray-900 block">Username</label>
                    <input ref={emailRef} type="email" className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl  w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label className="text-sm xl:text-xl 2xl:text-2xl font-bold text-gray-900 block">Password</label>
                    <input ref={passwordRef} type="password" className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-300 rounded"/>
                        <label htmlFor="" className="ml-2 text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-gray-900">Remember me</label>
                    </div>
                    <div>
                        <a href="#" className="text-sm md:text-sm xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Forgot password?</a>
                    </div>
                </div>
                <div>
                    <button className="w-full text-sm xl:text-xl 2xl:text-2xl p-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700">Login</button>
                </div>
                <div className="flex items-center justify-center">
                    <NavLink to="/register" className="text-sm md:text-sm xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Sign Up</NavLink>
                </div>
                <div>
                    <button button className="w-full text-sm xl:text-xl 2xl:text-2xl p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                        <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        <nav>
                            Sign in with Google
                        </nav>
                    </button>
                </div>
            </form>
        </div>
    </div>
    );

    //"../assets/Google__G__Logo.svg"
}