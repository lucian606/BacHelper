import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";

export default function HomePage() {

    const { loading, currentUser } = useAuth();
    if (loading) {
        return (
            <LoadingCircle/>
        )
    }
    return (
        <div>
        <Navbar></Navbar>
        <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center">
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">Welcome to StudyBuddy, <span className="font-bold"> {currentUser.email}</span>!</p>
                        <p className="text-center p-1 font-medium text-xl">Here is a short guide to our platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}