'use client';
import Link from "next/link";
import styles from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navigation() {
    const user = localStorage.getItem("user") 

    let parsedUser;
    if (user) {
        parsedUser = JSON.parse(user);
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
                        <UserInfo userId={parsedUser.user.id} />
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