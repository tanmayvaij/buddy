import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"

const context = createContext()

export default function Context({ children }) {

    const [ user, setUser ] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            user? setUser(user) : setUser(null)
        })
    }, [])

    return (
        <context.Provider value={{ user }}>
            { children }
        </context.Provider>
    )

}

export const GlobalStates = () => useContext(context)
