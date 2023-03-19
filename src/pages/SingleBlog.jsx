import { useParams } from "react-router-dom"
import * as fireDatabase from "firebase/database"
import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import { GlobalStates } from "../context"

export default function SingleBlog() {

    const { author_id, blog_id } = useParams()   
    
    const { user } = GlobalStates()

    const [ singleblog, setSingleblog ] = useState({})

    useEffect(() => {
        fireDatabase.onValue(fireDatabase.ref(db, `blogs/${author_id}/${blog_id}`), snapshot => {
            snapshot.exists() ? setSingleblog(snapshot.val()): setSingleblog({})
        })
    }, [])  

    return (
        <div id="singleblog" className="items-center min-h-[calc(100vh-57.6px)] justify-center flex flex-col">
            <h2 className="text-center p-3 max-w-[800px] text-2xl font-medium">{singleblog.title}</h2>
            <img className="rounded-md p-3 h-96 w-[600px]" src={singleblog.image} alt="" />
            <p className="p-3 mb-8 max-w-[800px]">{singleblog.blog}</p>
        </div>
    )
}
