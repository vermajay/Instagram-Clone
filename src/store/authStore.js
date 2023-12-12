import {create} from 'zustand'   //zustand is alternative to redux

const useAuthStore = create((set)=>({
    user: JSON.parse(localStorage.getItem("user-info")),
    login: (user) => set({user}),
    logout: () => set({user: null}),
    setUser: (user) => set({user}),
}))

export default useAuthStore;