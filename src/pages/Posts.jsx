import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import PostCard from "../components/PostCard"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import AppUsers from "../components/AppUsers"

export default function Posts() {

    const q = query(collection(db, "posts"), orderBy("id", "desc"))

    const [ posts, setPosts ] = useState([])

    useEffect(() => {

        onSnapshot(q, (res) => {
            setPosts(res.docs.map(post => post.data()))
        })

    }, [])

    return (
        <div id="posts" className="flex flex-col items-center justify-center">

            <AppUsers/>

            {
                (posts.length == 0) ? (
                    <div className="flex flex-col min-h-[calc(100vh-57.6px)] items-center justify-center">
                        <i className="text-3xl fa-solid fa-face-sad-tear"></i>
                        <h2>Sorry! No Posts Found</h2>
                    </div>
                ) : (
                    ""
                )
            }

            {
                posts.map((val, id) => {
                    return <PostCard key={id} { ...val } />
                })
            }
            
        </div>
    )
}
