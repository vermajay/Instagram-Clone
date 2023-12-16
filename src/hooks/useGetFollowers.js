import { useState, useEffect } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, query } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"
import useUserProfileStore from '../store/userProfileStore'

const useGetFollowers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [followerArray, setFollowerArray] = useState([])
    const userProfile = useUserProfileStore((state)=>state.userProfile)
    const showToast = useShowToast()

    useEffect(()=>{
        const getFollowers = async () => {
            setIsLoading(true)
            try{
                const userRef = collection(firestore, "users")
                const q = query(userRef)

                const querySnapshot = await getDocs(q)
                const users = [];
                querySnapshot.forEach((doc) =>{
                    if(userProfile.followers.includes(doc.data().uid))
                    users.push({...doc.data(), id:doc.id})
                })

                setFollowerArray(users)
            }   
            catch(error){
                console.error(error.message)
            }
            finally{
                setIsLoading(false)
            }
        }
        if(userProfile) getFollowers()
    }, [userProfile, showToast])

    return {isLoading, followerArray}
}

export default useGetFollowers
