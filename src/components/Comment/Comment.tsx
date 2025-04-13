'use client'
import { useEffect } from "react"

import { ApiClient } from "@/api";
import { Comment as CommentType } from "@/types";
import { useState } from "react";
import moment from "moment";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./Comment.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "@/context/AuthContext";

export default function Comment({postId}: {postId: string}) {

    const [comments, setComments] = useState<Array<CommentType> | null>(null);
    const [text, setText] = useState("");
    const {user} = useAuth();

    useEffect(() => {
        async function fetchComments() {
            const api = new ApiClient();
            const comments = await api.getCommentsByPostId(postId);

            setComments(comments ?? []);
        }
        fetchComments();
    }, [postId]);

    const handleComment = async() => {
        const api = new ApiClient();
        await api.postComment(postId, text);
        setText("");
        const updateComments = await api.getCommentsByPostId(postId);
        setComments(updateComments ?? []);
    }

    const handleDelete = async(commentId: string, userId: string) => {
        const api = new ApiClient();
        await api.deleteComment(commentId);
        const updateComments = await api.getCommentsByPostId(postId);
        setComments(updateComments ?? []);
    };

    return (
        <div>
            <div className={styles.make_comment}>
                <input type="text" placeholder="   write a comment" value={text} onChange={(e) => setText(e.target.value)}/>
                <button onClick={handleComment}>Send</button>
            </div>
            
            {comments?.map((comment) => 
            <div key={comment.id} className={styles.comment} id="comment" >
                <UserInfo userId={comment.userId}/>
                <div className={styles.comment_content}>
                    <span>{comment.text} </span>

                    <div className={styles.comment_actions}>
                        {user?.id === comment.userId &&
                            <DeleteIcon onClick={() => handleDelete(comment.id, comment.userId)}/>
                        }
                        <span>{moment(comment.createdAt).fromNow() }</span>
    
                    </div>
                    
                </div>
            </div>)}
        </div>
    )

}