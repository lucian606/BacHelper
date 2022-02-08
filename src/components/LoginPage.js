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
            if (error.code == 'auth/wrong-password') {
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
            </form>
        </div>
    </div>
    );
}