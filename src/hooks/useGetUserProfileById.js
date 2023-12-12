import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null)
    const showToast = useShowToast()

    useEffect(()=>{
        const getUserProfile = async() => {
            setIsLoading(true)
            setUserProfile(null)
            try {
                const userRef = await getDoc(doc(firestore, "users", userId))
                if(userRef.exists()){
                    setUserProfile(userRef.data())
                }

            } catch (error) {
                showToast("Error", error.message, "error");
            }
            finally{
                setIsLoading(false)
            }
        }
        getUserProfile()
    },[showToast, userId, setUserProfile]);

    return {isLoading, userProfile}
}

export default useGetUserProfileById
