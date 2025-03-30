'use client';

import Post from "../Post/Post";
import {Post as PostType} from "@/types";
import {useEffect, useState} from "react";
import {ApiClient} from "@/api";
import moment from "moment";
import Link from "next/link";


export default function User() {
    const user = localStorage.getItem("user");

    const [posts, setPosts] = useState<Array<PostType>| null>([]);

    let parsedUser;
    if (user) {
        parsedUser = JSON.parse(user);
        console.log("Parsed user:", parsedUser);
    }

    const userInfo = parsedUser.user;

    useEffect(() => {
        async function fetchPosts() {
            const api = new ApiClient();
            const posts = await api.getPostsByUserId(userInfo.id);
            setPosts(posts ?? []);
        }
        fetchPosts();
    }, []);


    console.log(posts);

    return (
        <div>
            <div >
                    <Link href="/" onClick={() => localStorage.removeItem("token")}>Logout</Link>
                </div>
            <p>TODO: make update user info, list their posts, and the edit and delete actions</p>
            <h1>User</h1>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Admin: {userInfo.admin ? "true" : "false"}</p>
            <p>Created At: {moment(userInfo.createdAt).fromNow()}</p>

            <div className="posts">
                {posts?.map((post) => <Post post={post}/>)}
        
            </div>

        </div>
    );
}