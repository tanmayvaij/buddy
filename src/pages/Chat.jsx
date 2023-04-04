import { onValue, ref, set } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuid4 } from "uuid"
import { GlobalStates } from "../context"
import { docDb } from "../firebaseConfig"

export default function Chat() {

    const { chatid } = useParams()

    const { user } = GlobalStates()

    const email = user.email.split("@")[0]

    const msg_id = `${Date.now()}-${uuid4()}`

    const [chats, setChats] = useState([])
    const [msg, setMsg] = useState("")
    const [receiverData, setReceiverData] = useState({})

    const getReceiverDetails = async (receiver) => {

        const res = await fetch(`https://iron-envelope-379712-default-rtdb.firebaseio.com/users/${receiver}.json`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })

        const data = await res.json()

        setReceiverData(data)

    }

    useEffect(() => {

        if (!chatid.includes(email)) return

        const user_ids = chatid.split("-")
        let receiver = user_ids[0]
        if ( user_ids[0] == email ) receiver = user_ids[1] 

        getReceiverDetails(receiver)

        const dbRef = ref(docDb, `chats/${chatid}`)
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val()
            if (data) setChats(Object.values(data))
        })

    }, [])

    const handleSubmitwithEnterKeyPress = (e) => {
        if (e.code === "Enter" && msg !== "") {
            sendMessage()
            setMsg("")
        } 
    }

    const sendMessage = () => {
        set(ref(docDb, `chats/${chatid}/${msg_id}`), { email, msg })
        setMsg("")
    }

    return (
        <div id="chat" className="border min-h-[calc(100vh-57.3px)]">

            <div className="flex border p-2 items-center">
                <img className="w-10 rounded-full " src={receiverData.photo} alt="" />
                <span className="text-sm pl-1">{receiverData.email}</span>
            </div>

            <div id="chatsection" className="min-h-[calc(100vh-156.5px)]">
                {
                    chats.map((chat, id) => {
                        return (
                            <div key={id} className={`${chat.email == email ? "flex-row-reverse" : ""} overflow-y-scroll px-5 py-2 flex items-center justify-between`}>
                                <p className="shadow-md px-6 py-2 bg-slate-50 rounded-md">
                                    <span>{chat.msg}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex">
                <input 
                    className="border rounded-sm pl-3 w-full h-10" 
                    placeholder="Enter message here" 
                    type="text" 
                    onChange={(e)=>setMsg(e.target.value)} 
                    value={msg} 
                    onKeyUp={handleSubmitwithEnterKeyPress}
                />
                <button onClick={sendMessage} className="text-white rounded-sm px-5 bg-blue-700">
                    <i className="fa-solid fa-location-arrow"></i>
                </button>
            </div>
            
        </div>
    )
}
