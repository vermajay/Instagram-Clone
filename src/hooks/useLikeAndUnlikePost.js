import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"

const useLikeAndUnlikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore(state=>state.user)
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))
    const showToast = useShowToast()

    const handleLikeAndUnlikePost = async() => {
        if(isUpdating) return
        if(!authUser) return showToast("Error", "You must be logged in to like a post", "error")
        setIsUpdating(true)
        
        try {
            const postRef = doc(firestore, "posts", post.id)
            await updateDoc(postRef, {
                likes: isLiked? post.likes.filter(like => like!== authUser?.uid) : [...post.likes, authUser?.uid]
            })

            setIsLiked(!isLiked)
            isLiked ? setLikes(likes-1) : setLikes(likes+1)

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false)
        }
    }
    return {isLiked, likes, handleLikeAndUnlikePost}
}

export default useLikeAndUnlikePost
