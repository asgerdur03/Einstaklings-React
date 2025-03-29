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
    // add the cat attributes
}