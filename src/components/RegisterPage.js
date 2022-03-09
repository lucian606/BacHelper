import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";

export default function RegisterPage() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup} = useAuth();
    const [error, setError] = useState('');
    const [succes, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log(loading);
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError('Passwords do not match');
            setSuccess('');
            setLoading(false);
            return;
        }

        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            setSuccess('Successfully registered');
            setError('');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists');
            } else {
                setError('Failed to create an account');
            }
            setSuccess('');
        }
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        setLoading(false);
    }    

    return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
            <div className="text-center font-medium text-xl">Create an account on</div>
            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Studdy Buddy</div>
        </div>
        <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error !== '' &&
                    <div className="bg-red-100 border border-red-400 text-red-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong className="text-md xl:text-xl 2xl:text-2xl font-bold">Error: </strong>
                            <div className="text-md xl:text-xl 2xl:text-2xl sm:inline">{error}</div>
                        </div>
                    </div>
                }
                {
                    succes !== '' &&
                    <div className="bg-green-100 border border-green-400 text-green-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong className="text-md xl:text-xl 2xl:text-2xl font-bold">Succes: </strong>
                            <div className="text-md xl:text-xl 2xl:text-2xl sm:inline">{succes}</div>
                        </div>
                    </div>
                }
                <div>
                    <label className="text-sm xl:text-xl 2xl:text-2xl font-bold text-gray-900 block">Email</label>
                    <input ref={emailRef} type="email" className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl  w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label className="text-sm xl:text-xl 2xl:text-2xl font-bold text-gray-900 block">Password</label>
                    <input ref={passwordRef} type="password" className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <label className="text-sm xl:text-xl 2xl:text-2xl font-bold text-gray-900 block">Confirm Password</label>
                    <input ref={confirmPasswordRef} type="password" className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="w-full text-sm xl:text-xl 2xl:text-2xl p-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-red-500">Register</button>
                </div>
                <div className="flex items-center justify-center">
                    <NavLink to="/login" className="text-sm md:text-sm xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Already have an account? Login here</NavLink>
                </div>
            </form>
        </div>
    </div>
    );
}