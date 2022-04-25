import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "../firebase";
import { collection, addDoc, query, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";
import PostPage from "./PostPage";
import PostCard from "./PostCard";

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

    async function deletePost(e, postId) {
        e.stopPropagation();
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

    async function handleNavigate(post) {
        setCurrentPost(post);
        getAllPosts();
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
            <PostPage currentPost={currentPost} setCurrentPost={setCurrentPost} handleNavigate={handleNavigate}/>
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
                            <PostCard index={index} post={post} setCurrentPost={setCurrentPost} deletePost={deletePost} currentUser={currentUser}/>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
}