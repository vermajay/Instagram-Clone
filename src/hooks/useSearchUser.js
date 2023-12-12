import { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState()
    const [user, setUser] = useState(null)
    const showToast = useShowToast()

    const getUserProfile = async(username) => {
        try {
            setIsLoading(true)
            const q = query(collection(firestore, "users"), where("username", "==", username))

            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty) return showToast("Error", "User not found", "error")

            querySnapshot.forEach((doc) =>{
                setUser(doc.data())
            })

        } catch (error) {
            showToast("Error", error.message, "error")
            setUser(null)
        }
        finally{
            setIsLoading(false)
        }
    }
    return {isLoading, user, getUserProfile, setUser}
}

export default useSearchUser
