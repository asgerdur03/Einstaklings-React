'use client';
import Link from "next/link";
import styles from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { ApiClient } from "@/api";
import { User } from "@/types";

export default function Navigation() {

    const [parsedUser, setParsedUser] = useState<User| null>(null);
    useEffect(() => {
        async function fetchUser() {
            const api = new ApiClient();
            if (!parsedUser) {
                const getUser = await api.getMe();

                if (!getUser) {
                    return;
                }
            setParsedUser(getUser);
            }
        }
        fetchUser();
        
    });
    
    return (
        <div className={styles.navigation}>
            <nav>
                <div className={styles.nav_item}>
                    <Link href="/home">
                        <HomeOutlinedIcon fontSize="large"/>
                    </Link>
                </div>
                <div className={styles.nav_item}>
                    <div className={styles.profile}>
                        <Link href="/home/me">
                        <UserInfo userId={parsedUser?.id ?? ""} />
                        </Link>
                    </div>
                </div>
                <div className={styles.nav_item}>
                    <Link href="/" onClick={() => localStorage.removeItem("token")}>
                        <LogoutIcon />
                    </Link>
                </div>
            </nav>
        </div>
    )
}