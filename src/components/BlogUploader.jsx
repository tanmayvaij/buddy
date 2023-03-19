import { useState } from "react"
import { v4 as uuid4 } from "uuid"
import { GlobalStates } from "../context"
import * as fireStorage from "firebase/storage"
import * as fireDatabase from "firebase/database"
import { db, storage } from "../firebaseConfig"

export default function BlogUploader() {

    const { user } = GlobalStates()

    const [file, setFile] = useState()
    const [blogdet, setBlogdet] = useState({ title: "", blog: "" })

    const handleBlogUpload = () => {

        const id = Date.now() + '-' + uuid4()

        if (!file || !blogdet.title || !blogdet.blog) alert("Missing Fields!")

        const storageRef = fireStorage.ref(storage, `/files/${file.name}`)
        const uploadTask = fireStorage.uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            () => { },
            (err) => console.log(err),
            () => {
                fireStorage.getDownloadURL(uploadTask.snapshot.ref).then((image) => {

                    fireDatabase.set(fireDatabase.ref(db, `blogs/${user.uid}/${id}`), { 
                        ...blogdet, image, id, author_id: user.uid
                    })
                    .then(() => {
                        setBlogdet({ title: "", blog: "" })
                        setFile("")
                    })
                    .catch(err => console.log(err))

                })
            }

        )

    }

    return (
        <div id="bloguploader" className="flex items-center justify-center flex-col">
            <div className="my-10 space-y-2 border flex items-center justify-center flex-col p-10">
                <div>
                    <input
                        onChange={(e) => setBlogdet({ ...blogdet, [e.target.name]: e.target.value })}
                        value={blogdet.title}
                        placeholder="Blog Title"
                        type="text"
                        name="title"
                        className="border border-gray-400 rounded placeholder:text-gray-500 w-80 h-10 pl-3"
                    />
                </div>
                <div>
                    <input
                        className="border file:bg-blue-600 file:text-white file:border-none file:rounded-md file:text-sm file:p-2 px-3 w-80 py-1 rounded-md border-gray-400"
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        name="image"
                    />
                </div>
                <div>
                    <textarea
                        className="resize-none border placeholder border-gray-400 rounded placeholder:text-gray-500 w-80 pl-3"
                        onChange={(e) => setBlogdet({ ...blogdet, [e.target.name]: e.target.value })}
                        value={blogdet.blog}
                        placeholder="Write your blog here"
                        name="blog"
                        cols="30"
                        rows="10"

                    >
                    </textarea>
                </div>
                <div>
                    <button className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded-md text-sm font-medium" onClick={handleBlogUpload}>Upload</button>
                </div>
            </div>
        </div>
    )
}
