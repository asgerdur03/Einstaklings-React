
import styles from "./Posts.module.css";
const mockPosts= [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        caption: "This is a mock post caption",
    }
]
export default function Posts() {
    return (
        <div>
            <h2>Posts</h2>
            {mockPosts.map((post) => (
                <div className={styles.post}>
                    <h1>{post.caption}</h1>
                    <img src={post.imageUrl} alt={post.caption} />    
                </div>
                
            ))}
        </div>
    );
}