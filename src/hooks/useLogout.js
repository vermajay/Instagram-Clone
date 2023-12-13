import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../Firebase/firebase"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
            navigate("/");
            showToast("Success", "Successfully logged out", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

  return {handleLogout, isLoggingOut, error}
}

export default useLogout
