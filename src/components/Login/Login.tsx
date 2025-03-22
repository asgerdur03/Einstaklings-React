import Link from "next/link";



export default async function login() {
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password"/>

            <button><Link href="/home">Login</Link></button>

        </div>
    );
}