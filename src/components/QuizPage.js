import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";
import { useState } from "react";
import { database } from "../firebase";

export default function QuizPage() {

    const { currentUser } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    function getRandomQuiz() {
        let newQuestions = new Set()
        console.log("Old questions")
        console.log(questions)
        while (newQuestions.size < 10) {
            newQuestions.add(getRandomArbitrary(1, 10))
        }
        newQuestions = Array.from(newQuestions)
        console.log("Setting questions");
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        database.ref(`/questions/mate/${newQuestions[currentQuestionIndex]}`).on('value', (snapshot) => {
            setCurrentQuestion(snapshot.val());
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        console.log(currentQuestionIndex);
        console.log(questions);
    }

    function nextQuestion(isCorrect) {
        console.log("current question index: " + currentQuestionIndex);
        console.log("questions length: " + questions.length);
        if (currentQuestionIndex < questions.length) {
            console.log("Next question");
            database.ref(`/questions/mate/${questions[currentQuestionIndex]}`).on('value', (snapshot) => {
                setCurrentQuestion(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            if (isCorrect) {
                console.log("Correct answer");
                setCorrectAnswers(correctAnswers + 1);
            } else {
                console.log("Wrong answer");
            }
        } else {
            console.log("Quiz finished");
            setCurrentQuestionIndex(0);
            setQuestions([]);
            setCurrentQuestion(null);
            console.log(correctAnswers);
            setCorrectAnswers(0);
        }
    }

    function handleClick() {
        getRandomQuiz();
        console.log("clicked")
    }

    return (
        <div className="h-screen">
            <Navbar/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center">
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">Welcome to WarTolds, <span className="font-bold"> {currentUser.email}</span>!</p>
                        <p className="text-center p-1 font-medium text-xl">Here is a short guide to our platform.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify justify-center mt-5">
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                    Start Quiz
                </button>
            </div>
            {
                currentQuestion &&
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center">
                        <div className="border-solid border-2 p-2 rounded-lg border-gray-600 m-4 flex flex-col justify-center items-center">
                            <p className="text-center p-1 font-medium text-xl">{currentQuestion.question}</p>
                            {
                                currentQuestion.answers.map((answer, index) => {
                                    return (
                                        <div className="flex justify-center items-center" key={index}>
                                            <button onClick={() => nextQuestion(answer.isCorrect)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                                                {answer.answer}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}