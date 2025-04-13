'use client';
import Link from "next/link";
import {ApiClient} from "@/api";
import React, {useState} from "react";
import styles from "./Login.module.css";
import { useAuth } from "@/context/AuthContext";


export default function Login() {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
    const {login} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const handleChange = (e: any) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const api = new ApiClient();
            const result = await api.apiLogin(inputs.username, inputs.email, inputs.password);
            if (result) {
                if (result.token) {
                    console.log("Result after login", result);
                    localStorage.setItem('token', result.token);
                    login(result.user, result.token);
                } else {
                    setError("Login failed, no token returned");
                }
            }else {
                setError("Login failed, no result returned");
            }
        } catch (error) {
            setError("Error logging in: " + error);
        }finally {
            setLoading(false);
        }
    }



    return (
        <div className={styles.page}>
            
        <div className={styles.card}>
            <div className={styles.left}>
                {loading && <p>Logging in...</p>}
                {error && <p style= {{color: "red"}}>{error}</p>}
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