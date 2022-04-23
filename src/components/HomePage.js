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
            <div>
                {currentUser.email}
            </div>
        </div>
    );
}