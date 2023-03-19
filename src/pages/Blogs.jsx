import { useEffect, useState } from "react"
import * as fireDatabase from "firebase/database"
import { db } from "../firebaseConfig"
import BlogCard from "../components/BlogCard"

export default function Blogs() {

    const [ blogs, setBlogs ] = useState([])

    useEffect(() => {

        let b = []

        fireDatabase.onValue(fireDatabase.ref(db, `blogs/`), snapshot => {

            if ( snapshot.exists() ) {


                snapshot.forEach(children => {
                    children.forEach((gc) => {
                        b = [ ...b, gc.val() ]
                    })
                })
                setBlogs(b)

            }

        })
    }, [])

    return (
        <div id="blogs" className="flex flex-wrap items-center justify-center min-h-[calc(100vh-57.6px)]">
            {
                blogs.reverse().map((val, id) => {
                    return <BlogCard key={id} { ...val } />
                })
            }
        </div>
    )
}
