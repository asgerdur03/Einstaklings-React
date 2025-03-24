'use client';
import { useState } from "react";
export default function PostForm() {
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);


    const handleCreatePost = async () => {
        console.log(caption, imageUrl, lat, lng);
        
    }
    return (
        <div>
            <h1>PostForm</h1>
            <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)}/>
            <input type="file" accept=".png,.jpg,.jpeg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <input type="number" placeholder="Latitude" value={lat} onChange={(e) => setLat(parseInt(e.target.value))} />
            <input type="number" placeholder="Longitude" value={lng} onChange={(e) => setLng(parseInt(e.target.value))}/>
            <button onClick={handleCreatePost} type="submit">Post</button>
        </div>
    );
}