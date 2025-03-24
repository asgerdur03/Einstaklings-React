

import styles from "./page.module.css";
import Link from "next/link";
import Login from "@/components/Login/Login";

export default function login() {
  return (
    <div className={styles.page}>
      <Login/>
      
      <div>
        <Link href="/register">Register</Link>
      </div>

    
    </div>
  );
}
