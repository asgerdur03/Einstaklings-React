import { useEffect } from "react";
import { ApiClient } from "@/api";
import { User } from "@/types";
import { useState } from "react";
import moment from "moment";
import styles from "./UserInfo.module.css";

export default function UserInfo(userId: { userId: string }) {
    // blablabla get user by userId, post the info, rpofile pic, username
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        async function fetchUser() {
            const api = new ApiClient();
            const getUser = await api.getUserById(userId.userId);
            setUser(getUser);
        }
        fetchUser();
    }, []);



    return (
        <div className={styles.userInfo}>
            <img className={styles.profilePic} src={user?.profilePic} alt="profile pic" />
            <span className={styles.username}>{user?.username}</span>
            
        </div>
    );
}