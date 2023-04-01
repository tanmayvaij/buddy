import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import ProfilePostCard from "../components/ProfilePostCard"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useParams } from "react-router-dom"
import Info from "../components/Info"

export default function Profile() {

    const { email } = useParams()

    const q = query(collection(db, "posts"), where("email", "==", email ), orderBy("id", "desc"))

    const [ posts, setPosts ] = useState([])
    
    useEffect(() => {

        onSnapshot(q, (res) => {
            setPosts(res.docs.map(post => post.data()))
        })

    }, [])

    return (
        <div id="profile" className="flex flex-col items-center justify-center">

            <Info/>

            <div className="max-w-[890px] flex border-t-2 pt-1 border-white flex-wrap items-center justify-center">
                {
                    posts.map((val, id) => {
                        return <ProfilePostCard key={id} {...val} />
                    })
                }
            </div>

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

        </div>
    )
}