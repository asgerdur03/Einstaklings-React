export default function PostInfo(userId: { userId: string }) {
    // blablabla get user by userId, post the info, rpofile pic, username
    return (
        <div>
            <h1>PostInfo</h1>
            <p>UserId: {userId.userId}</p>
        </div>
    );
}