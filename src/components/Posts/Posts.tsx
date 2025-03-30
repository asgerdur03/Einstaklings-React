'use client';
import styles from "./Posts.module.css";
import { use, useEffect, useState } from "react";
import {ApiClient} from "@/api";
import {Post as PostType} from "@/types";
import PostInfo from "../UserInfo/UserInfo";
import Link from "next/link";
import moment from "moment";
import Post from "../Post/Post";


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const api = new ApiClient();
            const posts = await api.getAllPosts();
            setPosts(posts ?? []);
        }

        fetchPosts();
    }, []);


    return (
        <div className={styles.posts}>
            {posts.map((post) => <Post post={post}/>)}
        </div>
    );
}
