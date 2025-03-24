'use client';
import Navigation from "@/components/Navigation/Navigation";
import Posts from "@/components/Posts/Posts";
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Navigation/>

            <div>
                <Posts/>
            </div>
        </div>
    );
}