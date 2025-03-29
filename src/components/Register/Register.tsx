'use client';
import Link from "next/link";
import { useState } from "react";
import { ApiClient } from "@/api";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";

export default function register() {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: any) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleRegister = async () => {
        const api = new ApiClient();
        const registered = await api.apiRegister(inputs.username, inputs.email, inputs.password);
        console.log(registered);

        
        if (registered) {
            alert("Registration successful");
            router.push("/");
        } else {
            alert("Registration failed");
        }
    }

    return (
        <div className={styles.page}>
        <div className={styles.card}>
            <div className={styles.left}>
                <span>Do you have an account?</span>
                <Link href="/"><button>Login</button></Link>
            </div>
            <div className={styles.right}>
                <h1>Register</h1>
                <form>
                <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                />
                <input
                type="email"
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
            
                <button onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    </div>
)};
