
import styles from "./Posts.module.css";
import { use, useEffect, useState } from "react";
import {ApiClient} from "@/api";
import {Post} from "@/types";


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
            const posts = await api.fetchFromApi<{posts: Post[]}>('http://localhost:5000/posts');
            setPosts(posts?.posts ?? []);
        }
        fetchPosts();
    }, []);

    console.log(posts);


    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className={styles.post}>
                    <img   src={post.imageUrl} alt={post.caption} />
                    <p>{post.caption}</p>
                    <p>lat : {post.lat}</p>
                    <p>long : {post.lng}</p>
                    <p>{(post.createdAt).toString()}</p>
                </div>
            ))}
            
            
        </div>
    );
}