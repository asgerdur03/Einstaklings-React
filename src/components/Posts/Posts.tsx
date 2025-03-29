'use client';
import styles from "./Posts.module.css";
import { use, useEffect, useState } from "react";
import {ApiClient} from "@/api";
import {Post} from "@/types";
import PostInfo from "../PostInfo/PostInfo";


const mockPosts= [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    },
    {
        id: "4",
        imageUrl: "https://picsum.photos/100/100",
        caption: "This is a mock post caption",
    }
]
export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const api = new ApiClient();
            const posts = await api.getAllPosts();
            setPosts(posts ?? []);
        }

        fetchPosts();
    }, []);

    console.log(posts);


    return (
        <div className={styles.posts}>
            <h2>Posts</h2>

            {posts.map((post) => (
                <div className={styles.post} key={post.id}>

                    <div className = {styles.postUser}>
                        <PostInfo userId={post.userId}/>
                    </div>

                    <div className={styles.postContent}>
                        <div>
                            <img src={post.imageUrl} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                        <div>
                            <div className={styles.tags}>
                                <p>{post.color}</p>
                                <p>{post.mood}</p>
                                <p>{post.size}</p>
                                < p>{post.age}</p>
                            </div>
                            <p>{post.lat}</p><p>{post.lng}</p>
                            <p>{post.createdAt.toString()}</p>
                        </div>
                        
                    </div>

                    <button>Like</button>
                    <input type="text" placeholder="Comment"/>

                </div>
            ))}
            
        </div>
    );
}