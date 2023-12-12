import { useState } from 'react'
import useAuthStore from '../store/authStore'
import useUserProfileStore from '../store/userProfileStore'
import useShowToast from './useShowToast'
import { useEffect } from 'react'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'

const useFollowAndUnfollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState()
    const [isFollowing, setIsFollowing] = useState()
    const {user, setUser} = useAuthStore()
    const {userProfile, setUserProfile} = useUserProfileStore()
    const showToast = useShowToast()

    const handleFollowAndUnfollowUser = async() => {
        try {
            setIsUpdating(true)
            const currentUserRef = doc(firestore, "users", user.uid)
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId)
            
            //update in firebase
            await updateDoc(currentUserRef, {
                following: isFollowing? arrayRemove(userId) : arrayUnion(userId)
            })
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            if(isFollowing){
                //unfollow the user
                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                })

                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== user.uid)
                })
                
                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false)
            }
            else{
                //follow the user
                setUser({
                    ...user,
                    following: [...user.following, userId]
                })

                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })

                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: [...user.following, userId]
                }))
                setIsFollowing(true)
            }

            
        } catch (error) {
            showToast("Error", error.message, "error");
        }
        finally{
            setIsUpdating(false)
        }
    }

    useEffect(()=>{
        if(user){
            const isFollowing = user.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    },[user, userId])

    return {isUpdating, isFollowing, handleFollowAndUnfollowUser}
}

export default useFollowAndUnfollowUser
