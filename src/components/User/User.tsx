'use client';

import Post from "../Post/Post";
import { Post as PostType} from "@/types";
import React, { useCallback, useEffect, useState} from "react";
import {ApiClient} from "@/api";
import moment from "moment";
import styles from "./User.module.css";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://einstaklings-api.onrender.com";
export default function User() {
    const [posts, setPosts] = useState<Array<PostType>| null>([]);
    const {user, setUser} = useAuth();

    const fetchPosts = useCallback(async() => {
      if (!user) return;
    
      const api = new ApiClient();
      console.log("calling getPostsByUserId");
      const posts = await api.getPostsByUserId(user.id);
      setPosts(posts ?? []);
    }, [user]);
    
    useEffect(() => {
      if (!user) return;

        fetchPosts();
    }, [user, fetchPosts]);

    // TODO: fix the update user, both in api and front
    const [form, setForm] = useState({
        profilePic: user?.profilePic
    })

    const handleChangeUser = async (e: React.FormEvent) => {
      // TODO: update imediately after updating
      e.preventDefault();
        const api = new ApiClient();
        if (!form.profilePic) return

        console.log("calling editUser");
        const newUser = await api.editUser(form.profilePic);

        setUser(newUser);
        console.log("new user: ", newUser);
        console.log("user: ", user);
    };

    const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      
      console.log("calling upload");
      const response = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: formData });
      const data = await response.json();
      const imageUrl = data.image?.[0]?.url
      console.log("image url: ", imageUrl);
      setForm((prev) => ({ ...prev, profilePic: imageUrl ?? "" }));
  }


    return (
        <div>
          { user ? (<>
          <div className={styles.upload_image}>
            <form onSubmit={handleChangeUser}>
              <p>Upload profile pic</p>
              <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
              {form.profilePic && (
                    <div className={styles.preview}>
                        <Image src={form.profilePic} alt="preview" width={100} height={100} key={form.profilePic} />
                    </div>
                )}
              <button type="submit">Submit</button>
            </form>
          </div>

        
          <div className={styles.profile}>
            <h1>User</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>User since: {moment(user.createdAt).fromNow()}</p>
            <p>Number of posts: {posts?.length}</p>
          </div>


          <div className={styles.posts}>
              {posts?.map((post, index) => <Post post={post} key={index} canDelete={true} onChange={fetchPosts}/>)}
          </div>
          </>) : <p>Not logged in</p>
}

        </div>
    );
}