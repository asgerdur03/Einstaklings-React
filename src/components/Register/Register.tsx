'use client';
import Link from "next/link";
import { useState } from "react";
import { ApiClient } from "@/api";
import { useRouter } from "next/navigation";

export default function register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleRegister = async () => {
        console.log(username, email, password);
        const api = new ApiClient();
        const registered = await api.apiRegister(username, email, password);

        if (registered) {
            alert("Registration successful");
            router.push("/");
        } else {
            alert("Registration failed");
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={handleRegister}>Register</button>

        </div>
    );
}