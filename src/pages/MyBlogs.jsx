import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import * as fireDatabase from "firebase/database"
import { GlobalStates } from "../context"
import BlogCard from "../components/BlogCard"
import BlogUploader from "../components/BlogUploader"

export default function MyBlogs() {

    const { user } = GlobalStates()

    const [myblogs, setMyblogs] = useState([])

    useEffect(() => {
        fireDatabase.onValue(fireDatabase.ref(db, `blogs/${user.uid}`), snapshot => {
            snapshot.exists() ? setMyblogs(Object.values(snapshot.val())) : setMyblogs([])
        })
    }, [])


    return (
        <div id="MyBlogs">

            <BlogUploader/>

            <hr />

            {
                (myblogs.length == 0) ? (
                    <div className="flex flex-wrap items-center justify-center">
                        <h2>No Blogs Found</h2>
                    </div>
                ) : (
                    ""
                )
            }

            <div className="flex flex-wrap items-center justify-center">
                {
                    myblogs.reverse().map((val, id) => {
                        return <BlogCard key={id} {...val} />
                    })
                }
            </div>

        </div>
    )
}
