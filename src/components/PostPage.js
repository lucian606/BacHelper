import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { firestoreDb } from "../firebase";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";
import Comment from "./Comment";
import LoadingCircle from "./LoadingCircle";

export default function PostPage(props) {

    const { currentUser } = useAuth();
    const currentPost = props.currentPost;
    const commentRef = useRef();
    const handleNavigate = props.handleNavigate;
    const setCurrentPost = props.setCurrentPost;
    const [loading, setLoading] = useState(false);

    const postComment = async () => {
        try {
            setLoading(true);
            if (commentRef.current.value === '') {
                throw new Error('Can\'t submit empty comment');
            }
            const postRef = doc(firestoreDb, "posts", currentPost.id);

            const newComment = {
                authorEmail: currentUser.email,
                text: commentRef.current.value,
                time: new Date().toLocaleString()
            }

            await updateDoc(postRef, { comments: arrayUnion(newComment) });
            let updatedPost = await getDoc(postRef);
            updatedPost = updatedPost.data();
            updatedPost.id = currentPost.id;
            setCurrentPost(updatedPost);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return;
        }
    }

    const deleteComment = async (index) => {
        try {
            setLoading(true);
            const postRef = doc(firestoreDb, "posts", currentPost.id);
            const comments = currentPost.comments;
            const comment = comments[index];
            await updateDoc(postRef, { comments: arrayRemove(comment) });
            let updatedPost = await getDoc(postRef);
            updatedPost = updatedPost.data();
            updatedPost.id = currentPost.id;
            setCurrentPost(updatedPost);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return;
        }
    }

    if (loading) {
        return (
            <div>
                <Navbar handleNavigate={handleNavigate}></Navbar>
                <LoadingCircle />
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Navbar handleNavigate={handleNavigate}/>
            <div className="flex-nowrap ml-4 mr-4">
                <div className="border-solid border-2 p-4 rounded-lg border-gray-600 mt-4 mb-4">
                    <p className="text-4xl font-bold break-all">
                        {currentPost.title}
                    </p>
                    <p className="break-all text-2xl pt-2 pb-2">
                        {currentPost.description}
                    </p>
                    <p className="text-lg break-all">
                        By: {currentPost.authorEmail}
                    </p>
                    <p className="text-lg break-all">
                        At: {currentPost.time}
                    </p>
                </div>
                <div className="mb-4">
                    <textarea type="text" ref={commentRef} rows={2} id="comment" className="block p-4 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                    <button 
                    onClick={postComment}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">
                        Post Comment
                    </button>
                </div>
                <div className="mb-4">
                    Comments:
                </div>
                <div>
                    {
                        currentPost.comments.map((comment, index) => {
                            return (
                                <Comment comment={comment} index={index} deleteComment={deleteComment} currentUser={currentUser}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}