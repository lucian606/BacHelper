import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "../firebase";
import { collection, addDoc, query, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
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
            setPosts([]);
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

    async function deletePost(postId) {
        try {
            const postRef = doc(firestoreDb, "posts", postId);
            await deleteDoc(postRef);
            await getAllPosts();
            console.log("deleted");
        } catch (error) {
            console.log(error);
            return;
        }
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
                                // onClick={() => setCurrentPost(post)}>
                                >
                                <div>
                                    <div onClick={() => setCurrentPost(post)}>
                                        <span className="text-2xl font-bold ml-2 break-all">{post.title}</span>
                                    </div>
                                    <div>
                                        <span className="text-xl ml-2 break-all">Posted by: {post.authorEmail}</span>
                                    </div>
                                    <div>
                                        <span className="text-lg ml-2 break-all">Comments: {post.comments.length}</span>
                                    </div>
                                </div>
                                {
                                    currentUser.email === post.authorEmail &&
                                    <button onClick={() => deletePost(post.id)}>
                                        <svg className="fill-current w-10 h-10 m-2" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/>
                                            </g>
                                            <g>
                                                <path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/>
                                            </g>
                                            <g>
                                                <path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/>
                                            </g>
                                            <g>
                                                <path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/>
                                            </g>
                                            <g>
                                                <path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/>
                                            </g>
                                        </svg>
                                    </button>
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
}