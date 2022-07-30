import { useAuth } from "../contexts/AuthContext";
import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";
import Pdf from "./Pdf";
import PDFViewer from 'pdf-viewer-reactjs';
import { database, storage } from "../firebase";

export default function SubjectGeneratorPage(props, ref) {

    const { loading } = useAuth();
    const subjectRef = useRef();
    const profileRef = useRef();
    const [firstSubjectUrl, setFirstSubjectUrl] = useState("");
    const [secondSubjectUrl, setSecondSubjectUrl] = useState("");
    const [thirdSubjectUrl, setThirdSubjectUrl] = useState("");
    const [showFirstSubj, setShowFirstSubj] = useState(false);
    const [showSecondSubj, setShowSecondSubj] = useState(false);
    const [showThirdSubj, setShowThirdSubj] = useState(false);
    const [error, setError] = useState('');
    const [succes, setSuccess] = useState('');

    const subjectNames = {
        "Limba Romana" : "Romana",
        "Matematica" : "Mate",
        "Istorie" : "Istorie"
    }
    const maximumId = 5;

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function toggleFirstSubj() {
        setShowFirstSubj(!showFirstSubj);
    }

    function toggleSecondSubj() {
        setShowSecondSubj(!showSecondSubj);
    }

    function toggleThirdSubj() {
        setShowThirdSubj(!showThirdSubj);
    }

    async function getSubject() {
        const firstSubjectId = getRandomArbitrary(1, maximumId + 1);
        const secondSubjectId = getRandomArbitrary(1, maximumId + 1);
        const thirdSubjectId = getRandomArbitrary(1, maximumId + 1);
        let subjectName = subjectRef.current.value;
        let profileName = profileRef.current.value;
        let errorEncountered = false;
        subjectName = subjectNames[subjectName];
        setError('');
        setSuccess('');
        database.ref(`/subjects/${subjectName}/${profileName}/1/${firstSubjectId}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                setFirstSubjectUrl(snapshot.val().url);
            } else {
                console.log("No data");
                setError("Invalid profile and topic combination");
            }
        }, (error) => {
            console.log(error);
            setError("An error encountered")
            errorEncountered = true;
        });
        database.ref(`/subjects/${subjectName}/${profileName}/2/${secondSubjectId}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                setSecondSubjectUrl(snapshot.val().url);
            } else {
                console.log("No data");
                setError("Invalid profile and topic combination");
            }
        }, (error) => {
            console.log(error);
            setError("An error encountered")
            errorEncountered = true;
        });
        database.ref(`/subjects/${subjectName}/${profileName}/3/${thirdSubjectId}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                setThirdSubjectUrl(snapshot.val().url);
            } else {
                console.log("No data");
                setError("Invalid profile and topic combination");
            }
        }, (error) => {
            console.log(error);
            setError("An error encountered");
            errorEncountered = true;
        });
        // sleep
        // if (!errorEncountered) {
        //     setSuccess("Successfully generated subjects");
        //     setTimeout(() => {
        //         setSuccess('');
        //     }, 2000);
        // }
    }

    if (loading) {
        return (
            <div>
                <Navbar/>
                <div className="min-h-screen flex flex-col justify-center">
                    <div className="text-center">
                        <svg role="status" className="inline mr-2 w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <Navbar/>
                { error !== '' &&
                        <div className="m-5 bg-red-100 border border-red-400 text-red-700 rounded relative flex justify-center" role="alert">
                            <div>
                                <strong className="text-2xl font-bold">Error: </strong>
                                <div className="text-2xl sm:inline">{error}</div>
                            </div>
                        </div>
                }
                { succes !== '' &&
                        <div className="m-5 bg-green-100 border border-green-400 text-green-700 rounded relative flex justify-center" role="alert">
                            <div>
                                <strong className="text-2xl font-bold">Succes: </strong>
                                <div className="text-2xl sm:inline">{succes}</div>
                            </div>
                        </div>
                }                
                <div className="flex justify justify-center m-auto">
                    <h1>
                        Subject Generator
                    </h1>
                </div>
            </div>
            <div className="flex justify-center m-auto">
                <Dropdown ref={subjectRef} defaultText='Select Subject' id='subjectDropdown' options={['Limba Romana', 'Matematica', 'Istorie']}/>
            </div>
            <div className="flex justify-center m-auto">
                <Dropdown ref={profileRef} defaultText='Select Profile' id='profileDropdown' options={['Real', 'Uman']}/>
            </div>
            <div className="flex justify justify-center mt-5">
                <button onClick={getSubject} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                    Generate Random Subject
                </button>
            </div>
            { firstSubjectUrl && secondSubjectUrl && thirdSubjectUrl &&
                <div>
                    <div className="flex justify-center">
                        <a href={firstSubjectUrl} rel="noopener noreferrer" target="_blank" className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">First Subject</a>
                    </div>
                    <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                        <h2 id="accordion-collapse-heading-1">
                            <button type="button" onClick={toggleFirstSubj} className="flex justify-between items-center p-5 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                <span>Show First Subject</span>
                                <svg data-accordion-icon className={`w-6 h-6 ${showFirstSubj && 'rotate-180'} shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </h2>
                    </div>
                    <div className={`flex justify-center ${!showFirstSubj && 'hidden'}`}>
                        <Pdf url={firstSubjectUrl}/>
                    </div>
                    <div className="flex justify-center">
                        <a href={secondSubjectUrl} rel="noopener noreferrer" target="_blank" className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Second Subject</a>
                    </div>
                    <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                        <h2 id="accordion-collapse-heading-1">
                            <button type="button" onClick={toggleSecondSubj} className="flex justify-between items-center p-5 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                <span>Show Second Subject</span>
                                <svg data-accordion-icon className={`w-6 h-6 ${showSecondSubj && 'rotate-180'} shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </h2>
                    </div>
                    <div className={`flex justify-center ${!showSecondSubj && 'hidden'}`}>
                        <Pdf url={secondSubjectUrl}/>
                    </div>
                    <div className="flex justify-center">
                        <a href={thirdSubjectUrl} rel="noopener noreferrer" target="_blank" className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-blue-500 hover:text-blue-700">Third Subject</a>
                    </div>
                    <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                        <h2 id="accordion-collapse-heading-1">
                            <button type="button" onClick={toggleThirdSubj} className="flex justify-between items-center p-5 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                <span>Show Third Subject</span>
                                <svg data-accordion-icon className={`w-6 h-6 ${showThirdSubj && 'rotate-180'} shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </h2>
                    </div>
                    <div className={`flex justify-center ${!showThirdSubj && 'hidden'}`}>
                        <Pdf url={thirdSubjectUrl}/>
                    </div>
                </div>
            }

        </div>
    );
}