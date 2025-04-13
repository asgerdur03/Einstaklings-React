'use client';
import styles from "./Posts.module.css";
import { useEffect, useState } from "react";
import {ApiClient} from "@/api";
import {Post as PostType} from "@/types";

import Post from "../Post/Post";


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);

    async function fetchPosts() {
            const api = new ApiClient();
            const posts = await api.getAllPosts();
            setPosts(posts ?? []);
        }

    useEffect(() => {
        
        fetchPosts();
    },
    []
);


    return (
        <div className={styles.posts}>
            {posts.map((post, index) => <Post post={post} key={index} onChange={fetchPosts}/>)}
        </div>
    );
}
