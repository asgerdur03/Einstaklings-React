'use client';
import Link from "next/link";
import { use, useState } from "react";
import { useEffect } from "react";
import { ApiClient } from "@/api";
import { User } from "@/types";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const user = localStorage.getItem("user") 

    let parsedUser;
    if (user) {
        parsedUser = JSON.parse(user);
        console.log("Parsed user:", parsedUser);
    }

    return (
        <div className={styles.navigation}>
            <nav>
                <div className={styles.nav_item}>
                    <div className={styles.profile}>
                        <Link href="/home/me">
                        <img src={parsedUser.user.profilePic} alt="profile pic" />
                        <span>{parsedUser.user.username}</span>
                        </Link>
                    </div>
                </div>

                <div className={styles.nav_item}>
                    <Link href="/home">Home</Link>
                </div>

                <div className={styles.nav_item}>
                    <Link href="/" onClick={() => localStorage.removeItem("token")}>Logout</Link>
                </div>
            </nav>
        </div>
    )
}