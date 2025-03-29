'use client'
export default function User() {
    const user = localStorage.getItem("user");

    let parsedUser;
    if (user) {
        parsedUser = JSON.parse(user);
        console.log("Parsed user:", parsedUser);
    }

    const userInfo = parsedUser.user;

    return (
        <div>
            <p>TODO: make update user info, list their posts, and the edit and delete actions</p>
            <h1>User</h1>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Admin: {userInfo.admin ? "true" : "false"}</p>
            <p>Created At: {userInfo.createdAt.toString()}</p>

            <div className="posts">

            </div>

        </div>
    );
}