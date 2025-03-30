import Navigation from "@/components/Navigation/Navigation";
import User from "@/components/User/User";
import styles from "./../Home.module.css";
export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.navigation}>
                <Navigation/>
            </div>

            <div className={styles.container}>
                <h1>Me</h1>
                <User/>
            </div>
        </div>
    );
}