'use client';
import Link from "next/link";
import {ApiClient} from "@/api";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        console.log(username, email, password);
        const api = new ApiClient();
        const loggedIn = await api.apiLogin(username, email, password);
        console.log(loggedIn);

        if (loggedIn) {
            console.log("Login successful");
            router.push("/home");
        } else {
            alert("Login failed");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>

        </div>
    );
}