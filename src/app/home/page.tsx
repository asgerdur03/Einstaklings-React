'use client';
import Navigation from "@/components/Navigation/Navigation";
import PostForm from "@/components/PostForm/PostForm";
import Posts from "@/components/Posts/Posts";
import styles from "./Home.module.css";	


export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.navigation}>
                <Navigation/>

            </div>

            <div className={styles.container}>
                <PostForm/>
                <Posts/>
            </div>
        </div>
    );
}