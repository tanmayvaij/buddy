import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, docDb } from "../firebaseConfig"
import { onValue, ref } from "firebase/database"

const context = createContext()

export default function Context({ children }) {

    const [ user, setUser ] = useState(null)
    const [ appUsers, setAppUsers ] = useState([])

    const getAppUsers = async () => {

        const dbRef = ref(docDb, "users")
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val()
            if (data) setAppUsers(Object.values(data))
        })

    }

    useEffect(() => {

        onAuthStateChanged(auth, user => {

            if (user) {
                
                setUser(user) 

                fetch(`https://iron-envelope-379712-default-rtdb.firebaseio.com/users/${user.email.split("@")[0]}.json`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "applciation/json"
                    },
                    body: JSON.stringify({ email: user.email.split("@")[0], photo: user.photoURL, uid: user.uid })
                })

                getAppUsers()

            } 

            else setUser(null)

        })

    }, [])

    return (
        <context.Provider value={{ user, appUsers }}>
            { children }
        </context.Provider>
    )

}

export const GlobalStates = () => useContext(context)
