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
                <div className="flex flex-col justify-center">
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">Welcome to StudyBuddy, <span className="font-bold"> {currentUser.email}</span>!</p>
                        <p className="text-center p-1 font-medium text-xl">Here is a short guide to our platform.</p>
                    </div>
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Subject Generator</span> page to: </p>
                        <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                            <li> Generate a test sample </li>
                        </ul>
                    </div>
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Forum</span> page to: </p>
                        <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                            <li> See the posts that have been made</li>
                            <li> Create and delete posts</li>
                            <li> Check out a certain post and look at its comments</li>
                            <li> Comment on a given post</li>
                            <li> Delete your comments</li>
                        </ul>
                    </div>
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Quizzes</span> page to: </p>
                        <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                            <li> Do a randomly generated quiz </li>
                            <li> See the answers to the questions you got wrong </li>
                        </ul>
                    </div>
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Stats</span> page to: </p>
                        <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                            <li> See your scores on the past quizzes </li>
                            <li> See a visualisation of those scores </li>
                        </ul>
                    </div>
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Career Helper</span> page to: </p>
                        <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                            <li> Do a personality test </li>
                            <li> Find a career that suits your personality </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}