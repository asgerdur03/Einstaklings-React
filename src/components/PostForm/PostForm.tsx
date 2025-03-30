'use client';
import { useState } from "react";
import { ApiClient } from "@/api";
import styles from "./PostForm.module.css";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://einstaklings-api.onrender.com";

const enumOptions = {
    color: ["BLACK", "ORANGE", "GRAY", "WHITE", "MIXED","BROWN", "TABBY", "CALICO", "TORTOISESHELL"],
    mood: [ "FRIENDLY", "SCARED", "CURIOUS", "PLAYFUL","ANGRY", "SLEEPY", "ALERT"],
    size: ["SMALL", "MEDIUM", "LARGE", "CHONKY"],
    age: ["KITTEN", "ADULT", "SENIOR"]
}
// todo: set automatic value on enums
export default function PostForm() {
    const [form, setForm] = useState({
        imageUrl: "",
        caption: "",
        color: "BLACK",
        mood: "FRIENDLY",
        size: "SMALL",
        age: "KITTEN"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        // todo: fix, call the api, not fetch directly
        const response = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: formData });
        
        const data = await response.json();
        const imageUrl = data.image?.[0]?.url
        console.log("image url: ", imageUrl);

        setForm((prev) => ({ ...prev, imageUrl: imageUrl ?? "" }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const api = new ApiClient();
        const body = form ;
        const post = await api.createPost(body);

        window.location.reload();
        console.log(post);
    }

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, imageUrl: "" }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.post_form}>
                <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />

                {form.imageUrl && (
                    <div className={styles.preview}>
                        <Image src={form.imageUrl} alt="preview" width={200} height={200} />
                        <button onClick={handleRemoveImage}
                        style={{
                            position: "absolute",
                        }}
                        
                        >✕</button>
                    </div>
                
                )}

                <input type="text" name="caption" placeholder="Caption" value={form.caption} onChange={handleChange}/>

                {Object.entries(enumOptions).map(([key, values]) => (
                    <select key={key} name={key} value={(form as any)[key]} onChange={handleChange}>
                        {values.map((val) => (
                            <option key={val} value={val}>{val}</option>
                        ))}
                    </select>
                ))}
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}