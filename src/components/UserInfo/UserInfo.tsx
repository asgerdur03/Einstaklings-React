import { useEffect } from "react";
import { ApiClient } from "@/api";
import { User } from "@/types";
import { useState } from "react";
import styles from "./UserInfo.module.css";
import Image from "next/image";

export default function UserInfo(userId: { userId: string }) {
    // blablabla get user by userId, post the info, rpofile pic, username
    const [user, setUser] = useState<User | null>(null);

    

    useEffect(() => {
        async function fetchUser() {
            const api = new ApiClient();
            if (!userId.userId) {
                return;
            }
            console.log("calling getUserById");
            const getUser = await api.getUserById(userId.userId);
            setUser(getUser);
        }
        fetchUser();
    }, [userId.userId]);




    return (
        <div className={styles.userInfo}>
            <Image src={user?.profilePic ?? "https://res.cloudinary.com/dafrwbefp/image/upload/v1743367400/cats/y87frhwjbpp8hamvkg0j.png"} alt="profile pic" width={50} height={50} className={styles.profilePic} key={user?.id} />
            <span className={styles.username}>{user?.username}</span>
            
        </div>
    );
}