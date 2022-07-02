import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";
import { useState } from "react";
import { firestoreDb } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Graph from "./Graph";
import Dropdown from "./Dropdown";
import { useRef } from "react";

export default function StatisticsPage() {

    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState([]);
    const { currentUser } = useAuth();
    const daysAmount = {'Last 30 Days': 30, 'Last 90 Days': 90, 'All' : 0};
    const subjectNames = { "Limba Romana" : "romana", "Matematica" : "mate" };
    const subjectRef = useRef();
    const timeWindowRef = useRef();
    const [height, setHeight] = useState(0);
    async function getStats() {
        setLoading(true);
        const subjectName = subjectRef.current.value;
        const path = "quiz_results_" + subjectNames[subjectName];
        const statsRef = collection(firestoreDb, path);
        const q = query(statsRef, where("email", "==", currentUser.email));
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
        getDocs(q).then(async function(docs) {
            if (docs.empty) {
                console.log("No stats for this email!");
            } else {
                console.log("Stats for this email!");
                console.log(docs);
                docs.forEach(async function(doc) {
                    console.log(doc.data().grades);
                    setStats(doc.data().grades);
                });
            }
        });
        setLoading(false);
    }

    if (loading) {
        return (
            <LoadingCircle/>
        )
    }
    return (
        <div>
        <Navbar/>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <button onClick={getStats} className="w-full text-sm xl:text-xl 2xl:text-2xl p-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700 font-bold">Get Stats</button>
                </div>
                <div className="flex justify-between">
                    <div className="flex mr-5 mt-0">
                        <Dropdown ref={subjectRef} defaultText='Select Subject' id='subjectDropdown' options={['Limba Romana', 'Matematica', 'All Subjects']}/>
                    </div>
                    <div className="flex ml-5 mt-0">
                        <Dropdown ref={timeWindowRef} defaultText='Select Subject' id='subjectDropdown' options={['All', 'Last 30 Days', 'Last 90 Days']}/>
                    </div>
                </div>
            </div>
            {
                stats.length > 0 &&
                <div className="h-full m-10">
                    <Graph userData={stats} height={height} subject={subjectRef.current.value} timeWindow={daysAmount[timeWindowRef.current.value]}/>
                </div>
            }
        </div>
        
    );
}