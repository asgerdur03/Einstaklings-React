import styles from "./page.module.css";
import Link from "next/link";

export default function login() {
  return (
    <div className={styles.page}>
      <div>Login form here! <Link href="/home">Login, directs to home page</Link></div>

      <div>Register link<Link href="/register">Register</Link></div>

    
    </div>
  );
}
