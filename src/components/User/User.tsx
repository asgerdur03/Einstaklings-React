'use client';

import Post from "../Post/Post";
import {CreateUser, Post as PostType} from "@/types";
import React, {useEffect, useState} from "react";
import {ApiClient} from "@/api";
import moment from "moment";
import styles from "./User.module.css";
import Image from "next/image";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://einstaklings-api.onrender.com";
export default function User() {
    const user = localStorage.getItem("user");
    const [posts, setPosts] = useState<Array<PostType>| null>([]);

    let parsedUser;
    if (user) {
        parsedUser = JSON.parse(user);
    }
    const userInfo = parsedUser.user;
    
    useEffect(() => {
            async function fetchPosts() {
            const api = new ApiClient();
            const posts = await api.getPostsByUserId(userInfo.id);
            setPosts(posts ?? []);
        }
        fetchPosts();
    }, [userInfo.id]);

    const [form, setForm] = useState<CreateUser>({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        profilePic: userInfo.profilePic
    })

    const handleChangeUser = async (e: React.FormEvent) => {
      e.preventDefault();
        const api = new ApiClient();
        const newUser = await api.editUser(form);
        console.log("new user: ", newUser);
        window.location.reload();
    };

    const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: formData });
      const data = await response.json();
      const imageUrl = data.image?.[0]?.url
      console.log("image url: ", imageUrl);
      setForm((prev) => ({ ...prev, profilePic: imageUrl ?? "" }));
  }


    return (
        <div>
          <div className={styles.upload_image}>
            <form onSubmit={handleChangeUser}>
              <p>Upload profile pic</p>
              <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
              {form.profilePic && (
                    <div className={styles.preview}>
                        <Image src={form.profilePic} alt="preview" width={100} height={100} key={form.username} />
                    </div>
                )}
              <button type="submit">Submit</button>
            </form>
          </div>


          <div className={styles.profile}>
            <h1>User</h1>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>User since: {moment(userInfo.createdAt).fromNow()}</p>
            <p>Number of posts: {posts?.length}</p>
          </div>


          <div className={styles.posts}>
              {posts?.map((post, index) => <Post post={post} key={index}/>)}
          </div>
        </div>
    );
}