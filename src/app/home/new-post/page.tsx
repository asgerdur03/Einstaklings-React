import Navigation from "@/components/Navigation/Navigation";
import PostForm from "@/components/PostForm/PostForm";
export default function Home() {
    return (
        <div>
            <h1>New post</h1>
            <Navigation/>

            <PostForm/>
        </div>
    );
}