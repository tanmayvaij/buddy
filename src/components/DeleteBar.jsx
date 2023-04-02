import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"

export default function DeleteBar({ doc_id }) {

    const navigate = useNavigate()

    // function for deleting post, only available for account owners
    const deletePost = () => {

        const docRef = doc(db, "posts", doc_id)
        deleteDoc(docRef)
        .then(() => navigate(-1))
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div id="deletebar" className="mt-36 p-4 bg-red-50 w-full flex items-center justify-center">
            <button onClick={deletePost} className="text-red-600 hover:underline">
                <i className="fa-solid fa-trash mr-2"></i>
                Delete Post
            </button> 
        </div>
    )
}
