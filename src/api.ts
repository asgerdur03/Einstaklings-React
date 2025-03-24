import {User, Post} from "./types";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000";
export class ApiClient {
    async fetchFromApi<T>(
        url: string,
        options?: {
            method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
            body?: any;
        }
    ): Promise<T | null> {
        const token = localStorage.getItem("token");
        console.log(token);
        let response: Response | undefined;

        try {
            response = await fetch(url, {
                method: options?.method ?? "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token? { Authorization: `Bearer ${token}` }: {})
                },
                body: options?.body ? JSON.stringify(options.body) : undefined
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

    async apiLogin(username: string, email: string, password: string): Promise<boolean> {
        const url = `${BASE_URL}/users/login`;

        const res = await this.fetchFromApi<{ token: string }>(url, {
            method: "POST",
            body: {
                username: username,
                email: email,
                password: password
            }
        });

        if (res?.token) {
            localStorage.setItem("token", res.token);
            return true;
        }
        return false;
    }

    async apiRegister(username: string, email: string, password: string): Promise<User | null> {
        const url = `${BASE_URL}/users/register`;

        const res = await this.fetchFromApi<User>(url, {
            method: "POST",
            body: {
                username: username,
                email: email,
                password: password
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

}