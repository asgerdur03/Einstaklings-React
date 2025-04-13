'use client';
import Link from "next/link";
import styles from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
    const {user, logout, loading} = useAuth();

    if (loading) {
        return( <p>Loading...</p>)
    }
    
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

                        {user && 

                        <UserInfo userId={user.id} /> }

                        </Link>
                    </div>
                </div>
                <div className={styles.nav_item}>
                    <LogoutIcon onClick={logout} />
                </div>
            </nav>
        </div>
    )
}