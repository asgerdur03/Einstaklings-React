'use client';
import styles from "./Posts.module.css";
import { useEffect, useState, useCallback} from "react";
import {ApiClient} from "@/api";
import {Post as PostType} from "@/types";
import { useAuth } from "@/context/AuthContext";

import Post from "../Post/Post";


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [offset, setOffset] = useState(0);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();

    // Get the first 10 posts
    const fetchPosts= useCallback(async () =>{
        if (loading || !more) return;
        
        setLoading(true);

        // TODO: remove mock delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const api = new ApiClient();
        const newPosts = await api.getAllPosts(offset);
            
        if (newPosts && newPosts.length > 0) {
            setPosts(prev => [...prev, ...newPosts]);
            setOffset(prev => prev + 10);
            console.log(offset);
        } else {
            setMore(false); // no more posts
        }
        
        setLoading(false);
    }, [offset, loading, more]);

    useEffect(() => {
        if (user){
            fetchPosts();
        }
        
    },[user, fetchPosts]);

    


    return (
        <div className={styles.posts}>
            {posts.map((post, index) => <Post post={post} key={index} onChange={fetchPosts} />)}

            {more ? (
                <button className={styles.loadMore} onClick={fetchPosts} disabled={loading}>
                    {loading ? "Loading..." : "Load more"}
                </button>
            ): (
                <p className={styles.noMore}>No more posts</p>
            )
        }
        </div>
    );
}
