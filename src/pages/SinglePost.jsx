import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db, docDb } from "../firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore"
import CommentInput from "../components/CommentInput"
import { onValue, ref } from "firebase/database"
import CommentSection from "../components/CommentSection"
import DeleteBar from "../components/DeleteBar"
import { GlobalStates } from "../context"

export default function SinglePost() {

    const { post_id } = useParams()

    const { user } = GlobalStates()

    const [ allComments, setAllComments ] = useState([])

    // Query<DocumentData> object for fetching a single post with given id
    const q = query(collection(db, "posts"), where("id", "==", post_id))

    const [singlePost, setSinglePost] = useState({})

    window.scrollTo(0, 0)

    useEffect(() => {

        // fetching all comments from realtime database in realtime
        const dbRef = ref(docDb, `post_comments/${post_id}`)
        onValue(dbRef, (snapshot) => {

            const data = snapshot.val()
            if (data) setAllComments(Object.values(data))

            setTimeout(() => {
                const commentBox = document.getElementById("commentsection")
                commentBox.scrollTop = commentBox.scrollHeight    
            }, 150)

        })

        // fetching post from firestore databse
        getDocs(q)
        .then(postDoc => {
            postDoc.forEach(post => setSinglePost({ ...post.data(), docID: post.id }))
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <div id="singleblog" className="items-center min-h-[calc(100vh-57.6px)] justify-center flex flex-col">

            <div className="bg-white flex items-center justify-center flex-col pb-4 w-full mb-4 border-b-2 border-gray-200">
                <img className="rounded-lg m-3 h-96 w-[600px]" src={singlePost?.image ?? "/placeholder.webp"} alt="" />
                <p className="p-3  max-w-[800px]">{singlePost?.comment}</p>
            </div>

            <h2 className="text-3xl underline m-3">Comments</h2>

            <CommentInput post_id={post_id} />

            <CommentSection comments={allComments} />

            {
                (user.photoURL == singlePost.user_photo) ? <DeleteBar doc_id={singlePost.docID} /> : <></>
            }

        </div>
    )

}
