import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { firestoreDb } from "../firebase";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";

export default function PostPage(props) {

    const { currentUser } = useAuth();
    const currentPost = props.currentPost;
    const commentRef = useRef();
    const setCurrentPost = props.setCurrentPost;

    const postComment = async () => {
        try {
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
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className="flex flex-col">
            <Navbar setCurrentPost={setCurrentPost}/>
            <div className="flex-nowrap ml-4 mr-4">
                <div className="border-solid border-2 rounded-lg border-gray-600 mt-4 mb-4">
                    {currentPost.title}
                    <p className="break-word">
                        {currentPost.description}
                    </p>
                    {currentPost.authorEmail}
                    {currentPost.time}
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
                        currentPost.comments.map((comment) => {
                            return (
                                <div className="mb-4 border-solid border-2 rounded-lg border-gray-600">
                                    <p className="break-all">
                                        {comment.text}
                                    </p>
                                    <p className="break-all">
                                        {comment.authorEmail}
                                    </p>
                                    <p className="break-all">
                                        {comment.time}
                                    </p>
                                    {
                                        currentUser.email === comment.authorEmail &&
                                        <button>
                                            DELETE ME
                                        </button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}