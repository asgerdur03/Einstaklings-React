'use client';
import Link from "next/link";
import {ApiClient} from "@/api";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./Login.module.css";


export default function Login() {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: any) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const api = new ApiClient();
        console.log(inputs.username, inputs.email, inputs.password);
        const loggedIn = await api.apiLogin(inputs.username, inputs.email, inputs.password);
        console.log(loggedIn);

        if (loggedIn) {
            console.log("Login successful");
            
            router.push("/home");
        } else {
            alert("Login failed");
        }
    }

    return (
        <div className={styles.page}>
        <div className={styles.card}>
            <div className={styles.left}>
                <span>No account? No problem</span>
                <Link href="/register"><button>Register</button></Link>
            </div>
            <div className={styles.right}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                />
                <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                />
                <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                />
            
                <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
    );
}