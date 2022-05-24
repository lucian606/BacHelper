import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar(props) {

    const [navbarShown, setNavbarShown] = useState(true);

    const handleNavbar = () => {
        setNavbarShown(!navbarShown);
    }

    const handleLogout = () => {
        window.sessionStorage.removeItem("user");
        window.localStorage.removeItem("user");
    }

    const handleForum = async () => {
        if (props.handleNavigate) {
            return props.handleNavigate(null);
        }
        return () => {}
    }

    return (
        <nav className="flex items-center justify-between flex-wrap rounded-b-lg bg-blue-500 pb-2">
            <div className="flex items-center flex-shrink-0 text-white mr-2 ml-4">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span className="font-semibold text-xl tracking-tight">StudyBuddy</span>
            </div>
            <div className="lg:hidden mt-2 mr-5 mb-2">
                <button onClick={handleNavbar} className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${!navbarShown && 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <NavLink to="/" className="block mt-5 lg:inline-block text-xl lg:mt-0 text-blue-200 hover:text-white ml-4">
                        HomePage
                    </NavLink>
                    <NavLink to="/subject_generator" className="block mt-5 lg:inline-block text-xl lg:mt-0 text-blue-200 hover:text-white ml-4">
                        Subject Generator
                    </NavLink>
                    <NavLink to="/forum" onClick={handleForum} className="block mt-5 lg:inline-block text-xl lg:mt-0 text-blue-200 hover:text-white ml-4">
                        Forum
                    </NavLink>
                    <NavLink to="/quiz" className="block mt-5 lg:inline-block text-xl lg:mt-0 text-blue-200 hover:text-white ml-4">
                        Quizzes
                    </NavLink>
                    <NavLink to="/stats" className="block ml-4 mt-5 mb-5 lg:inline-block text-xl lg:mt-0 text-blue-200 hover:text-white">
                        Statistics
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/login" onClick={handleLogout} className="block lg:inline-block text-xl mb-0 lg:mt-0 text-blue-200 hover:text-white ml-4 mr-4">
                        Sign Out
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}