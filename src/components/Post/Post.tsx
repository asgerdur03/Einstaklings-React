'use client'
import {Post as PostType} from "@/types";
import styles from "./Post.module.css";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { ApiClient } from "@/api";
import {Like} from "@/types";
import Comment from "../Comment/Comment";
import UserInfo from "../UserInfo/UserInfo";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Post({post, canDelete=false, onChange}: {post: PostType, canDelete?: boolean, onChange: () => void}) {
    const postId = post.id;

    const [likes, setLikes] = useState<Array<Like>|null>(null);
    const [showLikers, setShowLikers] = useState(false);

    const [liked, setLiked] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        async function fetchLikes() {
            const api = new ApiClient();
            console.log("calling getLikesByPostId");
            const likes = await api.getLikesByPostId(postId);
            setLikes(likes ?? []);

            if (likes && user) {
                const hasLiked = likes.some((like) => like.userId === user.id);
                setLiked(hasLiked);
            }
        }

        fetchLikes();
    }, [postId, user]);

    const toggleLike = async() => {
        const api = new ApiClient();
        console.log("calling toggleLike");
        const isLiked = await api.toggleLike(postId);

        const likedNow = isLiked?.liked;
        setLiked(likedNow ?? false);

        console.log(isLiked);
        console.log("calling getLikesByPostId after toggleLike");
        const updateLikes = await api.getLikesByPostId(postId);

        setLikes(updateLikes ?? []);
    }

    // Menu
    const [showMenu, setShowMenu] = useState(false);
    


    const handleEdit = () => {
        console.log("Edit post", post.id);
        // kalla á onChange hér ef ég implementa
    };
    
    const handleDelete = async() => {
        const api = new ApiClient();
        console.log("calling deletePost");
        await api.deletePost(post.id);
        onChange();
        console.log("Delete post", post.id);
    };

    return (
        <div className={styles.post} key= {post.id}>

            <div className = {styles.postUser}>
                <UserInfo userId={post.userId}/>
                
                <div className = {styles.postOptions}>
                    {canDelete && (
                    <div>
                        
                        <MoreVertIcon onClick={() => setShowMenu(!showMenu)} />
                    {showMenu && (
                    <div className={styles.menu}>
                        <p onClick={handleEdit}>Edit</p>
                        <p onClick={handleDelete}>Delete</p>
                    </div>
                )}
                </div>
                )}
                <p>{moment(post.createdAt).fromNow()}</p>

                </div>
                
            </div>

            <div className={styles.postContent}>
                <p>{post.caption}</p>
                <div className={styles.postImage}>
                    <Image
                        src={post.imageUrl}
                        alt={post.caption}
                        width={400}
                        height={400}
                    />
                    
                </div>
                
                    <div className={styles.tags}>
                        <p className={styles.tag}>{post.color}</p>
                        <p className={styles.tag}>{post.mood}</p>
                        <p className={styles.tag}>{post.size}</p>
                        <p className={styles.tag}>{post.age}</p>
                    </div>
                
                <div className={styles.likes}>
                    {liked ? 
                    
                    (<FavoriteOutlinedIcon style={{ color: "red" }} onClick={() => toggleLike()} />) : ( <FavoriteBorderIcon onClick={() => toggleLike()}/>)}
                    <p onMouseEnter={() => setShowLikers(true)} onMouseLeave={() => setShowLikers(false)}>{likes?.length} ❤️</p>
                </div>

            </div>

            {showLikers &&
                <div className={styles.hoverbox}>
                    {likes?.map((like) => (
                        <div key={like.id}>
                            <UserInfo userId={like.userId} />
                        </div>
                    ))}
                </div>}

            <div className={styles.comments}>
                <Comment postId={post.id}/>
            </div>
        </div>
    );
}

            