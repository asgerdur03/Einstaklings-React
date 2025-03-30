export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    profilePic: string;
    admin: boolean;
    createdAt: Date
    // fix

}

export type CreateUser = {
    username: string;
    email: string;
    password: string;
    profilePic: string;
}

export type Post = {
    id: string;
    userId: string;
    imageUrl: string;
    caption: string;
    lat: number;
    lng: number;
    color: string;
    mood: string;
    size: string;
    age: string;
    createdAt: Date;
}

export type CreatePost = {
    imageUrl: string;
    caption: string;
    color: string;
    mood: string;
    size: string;
    age: string;
}


export type Like = {
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
}

export type Comment = {
    id: string;
    text: string;
    postId: string;
    userId: string;
    createdAt: Date;
}

