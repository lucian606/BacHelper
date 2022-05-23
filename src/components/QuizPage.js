import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { useState } from "react";
import { database } from "../firebase";
import Dropdown from "./Dropdown";
import { useRef } from "react";

export default function QuizPage() {

    const { currentUser } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [finishedQuiz, setFinishedQuiz] = useState(false);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [subject, setSubject] = useState("");
    const subjectNames = { "Limba Romana" : "romana", "Matematica" : "mate" };
    const subjectRef = useRef();

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    function getRandomQuiz() {
        setWrongQuestions([]);
        let newQuestions = new Set()
        console.log("Old questions")
        console.log(questions)
        let name = subjectRef.current.value;
        console.log(name)
        setSubject(subjectNames[name]);
        while (newQuestions.size < 10) {
            newQuestions.add(getRandomArbitrary(1, 10))
        }
        newQuestions = Array.from(newQuestions)
        console.log("Setting questions");
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        database.ref(`/questions/${subjectNames[name]}/${newQuestions[0]}`).on('value', (snapshot) => {
            setCurrentQuestion(snapshot.val());
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        });
        setCurrentQuestionIndex(1);
        console.log(currentQuestionIndex);
        console.log(questions);
    }

    function nextQuestion(isCorrect, givenAnswer) {
        console.log("current question: " + currentQuestionIndex + 1);
        console.log("questions length: " + questions.length);
        if (isCorrect) {
            console.log("Correct answer");
            setCorrectAnswers(correctAnswers + 1);
        } else {
            console.log("Wrong answer");
            let wrongAnswers = wrongQuestions;
            let question = currentQuestion;
            question.givenAnswer = givenAnswer;
            wrongAnswers.push(question);
            setWrongQuestions(wrongAnswers);
        }
        if (currentQuestionIndex < questions.length) {
            console.log("Checking Answer");
            console.log("Next question");
            database.ref(`/questions/${subject}/${questions[currentQuestionIndex]}`).on('value', (snapshot) => {
                setCurrentQuestion(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("Quiz finished");
            setCurrentQuestionIndex(0);
            setQuestions([]);
            setCurrentQuestion(null);
            console.log(correctAnswers);
            setFinishedQuiz(true);
            console.log("Wrong answers");
            console.log(wrongQuestions);
            setSubject("");
        }
    }

    function handleClick() {
        getRandomQuiz();
        console.log("clicked")
    }

    function handleRestart() {
        setCorrectAnswers(0);
        setFinishedQuiz(false);
    }

    if (finishedQuiz) {
        return (
            <div className="h-screen">
                <Navbar/>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center">
                        <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex justify-center items-center">
                            <p className="text-center p-1 font-medium text-xl">Quiz finished! You answered {correctAnswers}/10 questions correctly.</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify justify-center m-2">
                    <button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                        Take another quiz
                    </button>
                </div>
                <p className="text-center p-1 font-medium text-xl"> Here are the questions you got wrong: </p>
                {
                    wrongQuestions.map((question, index) => {
                        console.log(question);
                        return (
                            <div key={index} className="border-solid border-2 p-2 rounded-lg border-gray-600 m-4 flex flex-col justify-center items-center">
                                <p className="text-center p-1 font-medium text-xl">{question.question}</p>
                                {
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className="flex justify-center items-center w-full" key={index}>
                                                <button className={`w-full mt-4 ml-4 mr-4 border border-gray-600 ${answer.isCorrect && 'bg-green-500'} ${index === question.givenAnswer && `bg-red-400`} ${!answer.isCorrect && `bg-transparent`} text-gray-black font-bold py-2 px-4 rounded flex justify-center`}>
                                                    {answer.answer}
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
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
            <div className="flex justify-center m-auto">
                <Dropdown ref={subjectRef} defaultText='Select Subject' id='subjectDropdown' options={['Limba Romana', 'Matematica']}/>
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
                                        <div className="flex justify-center items-center w-full" key={index}>
                                            <button onClick={() => nextQuestion(answer.isCorrect, index)} className="w-full mt-4 ml-4 mr-4 border border-gray-600 bg-transparent hover:bg-gray-200 text-gray-black font-bold py-2 px-4 rounded flex justify-center">
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