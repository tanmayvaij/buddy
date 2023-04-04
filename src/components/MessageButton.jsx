import { GlobalStates } from "../context"
import { useNavigate } from "react-router-dom"

export default function MessageButton({ userEmail }) {

    const navigate = useNavigate()

    const { user } = GlobalStates()
    const email = user.email.split("@")[0]

    const createChatId = () => (email > userEmail )? `${email}-${userEmail}`: `${userEmail}-${email}`

    const goToChat = async () => {

        const chatid = createChatId() 

        await fetch(`https://iron-envelope-379712-default-rtdb.firebaseio.com/chatting_users/${email}.json`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ [chatid]: chatid })
        })

        await fetch(`https://iron-envelope-379712-default-rtdb.firebaseio.com/chatting_users/${userEmail}.json`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ [chatid]: chatid })
        })

        navigate(`/chat/${chatid}`)

    }

    return (
        <button onClick={goToChat} className="hover:bg-blue-700 m-4 bg-blue-600 rounded-md px-3 py-2 text-white">
            <i className="fa-solid fa-comments"></i>
            <span className="pl-3">Message</span>
        </button>
    )
}
