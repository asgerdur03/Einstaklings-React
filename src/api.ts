import {User, Post, Like, Comment, CreatePost, CreateUser} from "./types";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://einstaklings-api.onrender.com";
export class ApiClient {
    async fetchFromApi<T>(
        url: string,
        options?: {
            method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
            body?: any;
        }
    ): Promise<T | null> {
        const token = localStorage.getItem("token");
        console.log("token before fetching",token);
        let response: Response | undefined;

        try {
            response = await fetch(url, {
                method: options?.method ?? "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token? { Authorization: `Bearer ${token}` }: {})
                },
                body: options?.body ? JSON.stringify(options.body) : undefined,
                
            });
        } catch (error) {
            console.error("Error fetching from api", url, error);
            return null;
        }
        if (!response.ok) {
            console.error("non 2xx status from api", url, response);
            return null;
        }

        if (response.status === 204) {
            return null; //for delete
        }

        let json: unknown;
        try {
            json = await response.json();
        } catch (error) {
            console.error("Error parsing json from api", url, error);
            return null;
        }

        return json as T;
        
    } 

    async apiLogin(username: string, email: string, password: string){
        const url = `${BASE_URL}/users/login`;

        const res = await this.fetchFromApi<{ token: string , user: User}>(url, {
            method: "POST",
            body: {
                username: username,
                email: email,
                password: password
            }
        });

        if (res?.token) {
            localStorage.setItem("token", res.token);
            const token = localStorage.getItem("token");
            console.log("token after login",token);

        }
        return res;
    }

    async apiRegister(username: string, email: string, password: string): Promise<User | null> {
        const url = `${BASE_URL}/users/register`;

        const res = await this.fetchFromApi<User>(url, {
            method: "POST",
            body: {
                username: username,
                email: email,
                password: password,
                profilePic: null
            }
        });

        return res;
    }

    async getAllPosts(): Promise<Array<Post> | null> {
        const url = `${BASE_URL}/posts`;

        const res = await this.fetchFromApi<Array<Post>>(url, {
            method: "GET"
        });

        return res
    }

    async getLikesByPostId(postId: string): Promise<Array<Like> | null> {
        const url = `${BASE_URL}/likes/${postId}`;

        const data = await this.fetchFromApi<Array<Like> | null>(url, {
            method: "GET"
        });

        return data
    }

    async toggleLike(postId: string) {
        const url = `${BASE_URL}/likes`;

        const data = await this.fetchFromApi<{liked: boolean}>(url, {
            method: "POST",
            body: {
                postId: postId
            }
        });
        return data

    }

    async getCommentsByPostId(postId: string): Promise<Array<Comment> | null> {
        const url = `${BASE_URL}/comments/${postId}`;

        const data = await this.fetchFromApi<Array<Comment> | null>(url, {
            method: "GET"
        });

        return data
    }

    async postComment(postId: string, comment: string) {
        const url = `${BASE_URL}/comments`;

        const data = await this.fetchFromApi<Array<Comment> | null>(url, {
            method: "POST",
            body: {
                postId: postId,
                comment: comment
            }
        });

        return data
    }

    async getUserById(userId: string): Promise<User | null> {
        const url = `${BASE_URL}/users/find/${userId}`;

        const data = await this.fetchFromApi<User | null>(url, {
            method: "GET"
        });

        return data
    }

    async uploadImage(file: File): Promise<string | null> {
        const url = `${BASE_URL}/upload`;
        // fix, then use 

        const data = await this.fetchFromApi<string | null>(url, {
            method: "POST",
            body: {
                image: file
            }
        });

        return data
    }

    async createPost(post: CreatePost): Promise<Post | null> {
        const url = `${BASE_URL}/posts`;

        const data = await this.fetchFromApi<Post | null>(url, {
            method: "POST",
            body: {
                imageUrl: post.imageUrl,
                caption: post.caption,
                color: post.color,
                mood: post.mood,
                size: post.size,
                age: post.age
            }
        });

        return data
    }


    async getPostsByUserId(userId: string): Promise<Array<Post> | null> {
        const url = `${BASE_URL}/posts/users/${userId}`;

        const data = await this.fetchFromApi<Array<Post> | null>(url, {
            method: "GET"
        });

        return data
    }

    async getMe(): Promise<User | null> {
        const url = `${BASE_URL}/users/me`;

        const data = await this.fetchFromApi<User | null>(url, {
            method: "GET"
        });

        return data
    }

    // TODO- use
    async deletePost(postId: string) {
        const url = `${BASE_URL}/posts/${postId}`;
        const data = await this.fetchFromApi(url, {
            method: "DELETE"
        });
        return data
    }
    async deleteAccount() {
        const url = `${BASE_URL}/users/me`;
        const data = await this.fetchFromApi(url, {
            method: "DELETE"
        });
        return data
    }

    async deleteComment(commentId: string) {
        const url = `${BASE_URL}/comments/${commentId}`;
        const data = await this.fetchFromApi(url, {
            method: "DELETE"
        });
        return data
    }

    async editPost(postId: string, post: CreatePost) {
        const url = `${BASE_URL}/posts/${postId}`;
        const data = await this.fetchFromApi(url, {
            method: "PATCH",
            body: {
                imageUrl: post.imageUrl,
                caption: post.caption,
                color: post.color,
                mood: post.mood,
                size: post.size,
                age: post.age
            }
        });
        return data
    }

    async editComment(commentId: string, comment: string) {
        const url = `${BASE_URL}/comments/${commentId}`;
        const data = await this.fetchFromApi(url, {
            method: "PATCH",
            body: {
                comment: comment
            }
        });
        return data
    }

    async editUser(profilePic: string): Promise<User | null> {
        const url = `${BASE_URL}/users/me`;
        const data = await this.fetchFromApi<User | null>(url, {
            method: "PATCH",
            body: {
                profilePic: profilePic
            }
        });
        return data
    }



}