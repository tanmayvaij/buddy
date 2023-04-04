import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import PostCard from "../components/PostCard"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import AppUsers from "../components/AppUsers"

export default function Posts() {

    /* 
        Query<DocumentData> object for fetching all the posts in descending order
        according the their respective ids.
    */
    const q = query(collection(db, "posts"), orderBy("id", "desc"))

    const [ posts, setPosts ] = useState([])

    useEffect(() => {

        // fetching posts in real time (firestore)
        onSnapshot(q, (res) => {
            setPosts(res.docs.map(post => post.data()))
        })

    }, [])

    return (
        <div id="posts" className="flex flex-col items-center justify-center">

            <AppUsers/>

            {
                // shown when no posts found in database
                (posts.length == 0) ? (
                    <div className="flex flex-col min-h-[calc(100vh-57.6px)] items-center justify-center">
                        <i className="border-2 text-4xl p-10 border-gray-800 rounded-full fa-solid fa-camera"></i>
                        <h2 className="font-bold text-2xl m-2">No Posts Yet !</h2>
                    </div>
                ) : (
                    ""
                )
            }

            {
                // rendering all the posts
                posts.map((val, id) => {
                    return <PostCard key={id} { ...val } />
                })
            }
            
        </div>
    )
}
