import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";

export default function LoginPage() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const stayLoggedInRef = useRef();
    const { login, loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function signIn(e) {
        e.preventDefault();
        try {
            setError('');
            let user = await login(emailRef.current.value, passwordRef.current.value);
            window.sessionStorage.setItem("user", user);
            window.localStorage.removeItem("user");
            if (stayLoggedInRef.current.checked) {
                window.localStorage.setItem("user", user);
            }
            console.log(stayLoggedInRef.current.checked);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setError('Wrong password');
            } else {
                setError('Failed to login');
            }
        }
    }

    async function signInWithGoogle() {
        try {
            let user = await loginWithGoogle();
            window.sessionStorage.setItem("user", user);
            navigate('/');
        } catch (error) {
            navigate('/login');
            setError('Failed to login with google');
            console.log(error);
        }
    }
    
    return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
            <div className="text-center font-medium text-xl">Welcome to</div>
            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Studdy Buddy</div>
        </div>
        <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            <form className="space-y-6">
                {error !== '' &&
                    <div className="bg-red-100 border border-red-400 text-red-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong className="text-md xl:text-xl 2xl:text-2xl font-bold">Error: </strong>
                            <div className="text-md xl:text-xl 2xl:text-2xl sm:inline">{error}</div>
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input ref={stayLoggedInRef} type="checkbox" className="h-4 w-4 text-blue-300 rounded"/>
                        <label htmlFor="" className="ml-2 text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-gray-900">Remember me</label>
                    </div>
                    <div>
                        <a href="#" className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Forgot password?</a>
                    </div>
                </div>
                <div>
                    <button onClick={signIn} className="w-full text-sm xl:text-xl 2xl:text-2xl p-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700 font-bold">Sign In</button>
                </div>
                <div className="flex justify justify-center">
                    <button onClick={signInWithGoogle} className="w-full text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-bold p-2 text-white bg-red-700 rounded hover:bg-red-800 flex justify-center">
                        <svg viewBox="0 0 24 24" className="h-full w-4 lg:w-5 flex-no-shrink fill-current" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#FFFFFF" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                <path fill="#FFFFFF" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                <path fill="#FFFFFF" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                <path fill="#FFFFFF" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                            </g>
                        </svg>
                        <nav className="pl-2">
                            Login with Google
                        </nav>
                    </button>             
                </div>       
         
                <div className="flex items-center justify-center">
                    <NavLink to="/register" className="text-sm md:text-sm xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Sign Up</NavLink>
                </div>
            </form>
        </div>
    </div>
    );
}