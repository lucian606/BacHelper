import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "../firebase";
import { collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";

export default function ForumPage() {

    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        navigate("/submit");
    }

    async function getAllPosts() {
        setLoading(true);
        const postsRef = collection(firestoreDb, "posts");
        const q = query(postsRef);
        const snapshots = await getDocs(q);
        console.log(snapshots.size);
        if (snapshots.size === 0) {
            setLoading(false);
            return;
        }
        console.log(snapshots.docs[snapshots.size - 1].id);
        const loadedPosts = []
        for (let i = 0; i < snapshots.size; i++) {
            const post = snapshots.docs[i];
            console.log(post);
            const postData = post.data();
            console.log(postData);
            loadedPosts.push(postData);
        }
        setPosts(loadedPosts.reverse());
        setLoading(false);
    }

    useEffect(() => {
        getAllPosts().then(() => {
            console.log(posts);
        });
    }, []);

    if (loading) {
        return (
            <LoadingCircle/>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col justify-center mt-2">
                <div className="flex justify-between mb-2">
                    <span></span>
                    <button className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleSubmit}>
                        Make post
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                {
                    posts.map((post, index) => {
                        return (
                            <div className="flex flex-col w-11/12 mt-2 mb-2 border-solid border-2 rounded border-gray-600 bg-gray-200">
                                <div>
                                    <span className="text-2xl font-bold ml-1">{post.title}</span>
                                </div>
                                <div>
                                    <span className="text-lg ml-1">Posted by: {post.authorEmail}</span>
                                </div>
                                <div>
                                    <span className="ml-1">Comments: {post.comments.length}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
}