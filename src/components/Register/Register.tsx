import Link from "next/link";

export default async function register() {
    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password"/>

            <button><Link href="/">Register</Link></button>

        </div>
    );
}