import { useState, useEffect } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"
import useUserProfileStore from '../store/userProfileStore'

const useGetFollowing = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [followingArray, setFollowingArray] = useState([])
    const userProfile = useUserProfileStore((state)=>state.userProfile)
    const showToast = useShowToast()

    useEffect(()=>{
        const getFollowing = async () => {
            setIsLoading(true)
            try{
                const userRef = collection(firestore, "users")
                const q = query(
                    userRef,
                    where("uid", "in", [...userProfile.following]),
                    orderBy("uid")
                )

                const querySnapshot = await getDocs(q)
                const users = [];
                querySnapshot.forEach((doc) =>{
                    users.push({...doc.data(), id:doc.id})
                })

                setFollowingArray(users)
            }   
            catch(error){
                console.error(error.message)
            }
            finally{
                setIsLoading(false)
            }
        }
        if(userProfile) getFollowing()
    }, [userProfile, showToast])

    return {isLoading, followingArray}
}

export default useGetFollowing
