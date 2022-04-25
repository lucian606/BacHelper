import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "../firebase";
import { collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";
import PostPage from "./PostPage";

export default function ForumPage() {

    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
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
            postData.id = post.id;
            console.log(postData);
            loadedPosts.push(postData);
        }
        console.log(loadedPosts);
        loadedPosts.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });
        setPosts(loadedPosts);
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

    if (currentPost) {
        return (
            <PostPage currentPost={currentPost} setCurrentPost={setCurrentPost}/>
        );
    }

    return (
        <div>
            <Navbar setCurrentPost={setCurrentPost}/>
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
                            <div key={index} className="flex flex-col w-11/12 mt-2 mb-2 border-solid border-2 rounded-lg border-gray-600 bg-gray-100 hover:bg-gray-400 overflow-hidden shadow-lg hover:scale-105 transition ease-in-out"
                                onClick={() => setCurrentPost(post)}>
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