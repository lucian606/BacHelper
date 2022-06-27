import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";
import { firestoreDb } from "../firebase";
import PieChart from "./PieChart";
import { collection, addDoc, query, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";

export default function CareerPage() {

    const { currentUser } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [finishedQuiz, setFinishedQuiz] = useState(false);
    const [height, setHeight] = useState(0);
    const initialScores = {
        Informatica: 0,
        Inginerie: 0,
        Sport: 0,
        Arta: 0,
        Medicina: 0,
        Drept: 0,
        Arhitectura: 0,
        Filologie: 0
    }
    const [interestScores, setInterestScores] = useState(initialScores);
    const [chosenSubject, setChosenSubject] = useState(null);

    async function getCareerQuiz() {
        setLoading(true);
        const questionsRef = collection(firestoreDb, "career_questions");
        const q = query(questionsRef);
        const snapshots = await getDocs(q);
        if (snapshots.size === 0) {
            setLoading(false);
            setQuestions([]);
            return;
        }
        const loadedQuestions = []
        for (let i = 0; i < snapshots.size; i++) {
            const question = snapshots.docs[i];
            const questionData = question.data();
            setQuestions(questionData.questions)
        }
        setLoading(false);
    }

    function startQuiz() {
        setLoading(true);
        setFinishedQuiz(false);
        setInterestScores(initialScores);
        setCurrentIndex(0);
        setCurrentQuestion(questions[0]);
        setCurrentIndex(1);
        setChosenSubject(null);
        setLoading(false);
    }

    function getKeyWithMaxValue(obj) {
        return  Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
    }

    function nextQuestion(subjectScores) {
        if (currentIndex < questions.length) {
            console.log(subjectScores);
            const scores = interestScores;
            subjectScores.forEach(score => {
                console.log(score);
                scores[score.subject] += score.score;
            });
            setInterestScores(scores);
            console.log(interestScores);
            setCurrentQuestion(questions[currentIndex]);
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentQuestion(null);
            setFinishedQuiz(true);
            console.log(getKeyWithMaxValue(interestScores));
            setChosenSubject(getKeyWithMaxValue(interestScores));
            const { innerHeight: height } = window;
            console.log(height);
            if (height < 480) {
                console.log("Mobie");
                setHeight(200);
            } else if (height < 768) {
                console.log("Tablet")
                setHeight(300);
            } else if (height < 1024) {
                console.log("Laptop");
                setHeight(500);
            } else if (height < 1200) {
                console.log("Desktop");
                setHeight(600);
            } else {
                console.log("Large screen");
                setHeight(1000);
            }
            //setInterestScores(initialScores);
        }
    }

    useEffect(() => {
        getCareerQuiz().then(() => {
            console.log("Done");
        });
    }, []);


    if (loading) {
        return (
            <LoadingCircle/>
        )
    }

    if (finishedQuiz) {
        return (
            <div className="h-screen">
                <Navbar/>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center">
                        <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                            <p className="text-center p-1 font-medium text-xl">Quiz finished! Your career field is:</p>
                            <div className="flex justify-center">
                                <p className="text-center p-1 font-bold text-3xl">{chosenSubject}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify justify-center m-2">
                    <button onClick={startQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                        Take another quiz
                    </button>
                </div>
                <div>
                    <PieChart data={interestScores} height={height}/>
                </div>
            </div>
        )
    }

    return (
        <div>
        <Navbar></Navbar>
        <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center">
                    <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex justify-center items-center">
                        <p className="text-center p-1 font-medium text-xl">Welcome to StudyBuddy career, <span className="font-bold"> {currentUser.email}</span>!</p>
                    </div>
                </div>
                <div className="flex justify justify-center mt-5">
                    <button onClick={startQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
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
                                                <button onClick={() => nextQuestion(answer.subjectScores)} className="w-full mt-4 ml-4 mr-4 border border-gray-600 bg-transparent hover:bg-gray-200 text-gray-black font-bold py-2 px-4 rounded flex justify-center">
                                                    {answer.answerText}
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
        </div>
    );
}