import Link from "next/link";

export default function Navigation() {
    return (
        <div>
            <ul>
                <li><Link href="/">Logout</Link></li>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/home/me">Me</Link></li>
                <li><Link href="/home/new-post">New post</Link></li>
            </ul>
        </div>
    )
}