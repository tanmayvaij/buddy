import { ref, set } from "firebase/database"
import { useState } from "react"
import { GlobalStates } from "../context"
import { docDb } from "../firebaseConfig"
import { v4 as uuid4 } from "uuid"

export default function CommentInput({ post_id }) {

    const [userComment, setUserComment] = useState("")

    const { user } = GlobalStates()

    const post_comment_id = `${Date.now()}-${uuid4()}`

    // function for commenting on a post
    const Comment = () => {

        set(ref(docDb, `post_comments/${post_id}/${post_comment_id}`), {
            email: user.email.split("@")[0],
            userComment
        })

        setUserComment("")

    }

    const handleSubmitwithEnterKeyPress = (e) => {
        if (e.code === "Enter" && userComment !== "") Comment()
    }

    return (
        <div id="commentinput" className="m-2">
            <input 
                onChange={(e)=>setUserComment(e.target.value)} 
                className="border w-80 h-10 p-2 pl-4 rounded-sm" 
                type="text" 
                placeholder="add a comment" 
                value={userComment}
                onKeyUp={(e) => handleSubmitwithEnterKeyPress(e)}
            />
            <button onClick={Comment} className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-white">
                <i className="fa-solid fa-location-arrow"></i>
            </button>
        </div>
    )

}
