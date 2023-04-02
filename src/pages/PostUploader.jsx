import { useState } from "react"
import { v4 as uuid4 } from "uuid"
import { GlobalStates } from "../context"
import * as fireStorage from "firebase/storage"
import { db, storage } from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

export default function PostUploader() {

    const { user } = GlobalStates()

    const navigate = useNavigate()

    const email = user.email.split("@")[0]

    const [file, setFile] = useState()
    const [comment, setComment] = useState("")
    const [previewImg, setPreviewImg] = useState("placeholder.webp")
    const [uploadClicked, setUploadClicked] = useState(false)

    // function for previwing the iamge
    const addImageForPreview = (e) => {
        setFile(e.target.files[0])
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
    }

    // uploading post
    const handlePostUpload = () => {

        setUploadClicked(true)

        // generating unique id for each post
        const id = `${Date.now()}-${uuid4()}`

        // image should be compulsory included
        if (!file) alert("Image Required!")

        // reference for the firebase storage
        const storageRef = fireStorage.ref(storage, `/images/${file.name}`)

        // uploading image file to firebase storage
        const uploadTask = fireStorage.uploadBytesResumable(storageRef, file)

        // listener for uploading task
        uploadTask.on(
            "state_changed",
            () => { }, 
            (err) => console.log(err),
            () => {
                fireStorage.getDownloadURL(uploadTask.snapshot.ref).then((image) => {

                    // adding data to firestore database
                    addDoc(collection(db, "posts"), { 
                        image, 
                        comment, 
                        id, 
                        email, 
                        user_photo: user?.photoURL ?? "person.png"
                    })
                    .then(() => {
                        navigate("/")
                    })
                    .catch(err => {
                        console.log(err)
                    })

                })
            }

        )

    }

    // discarding post data
    const handlePostDiscard = () => {
        setFile()
        setPreviewImg("placeholder.webp")
        document.getElementById("img").value=""
    }

    return (
        <div id="postuploader" className="flex items-center min-h-[calc(100vh-57.6px)] justify-center flex-col">

            { uploadClicked && <Loader/> }

            <div className="bg-white rounded-md my-10 space-y-2 border flex items-center justify-center flex-col p-10">
                
                <div>
                    <input
                        className="border hover:cursor-pointer file:bg-blue-600 file:text-white file:border-none file:rounded-md file:text-sm file:p-2 px-3 w-80 py-1 rounded-md border-gray-400"
                        onChange={(e) => addImageForPreview(e)}
                        type="file"
                        name="image"
                        accept="image/*"
                        id="img"
                    />
                </div>

                <img className="w-80 h-52 rounded-md" src={previewImg} alt="" />

                <div>
                    <textarea
                        className="resize-none border focus:outline-indigo-500 placeholder border-gray-400 rounded placeholder:text-gray-500 w-80 pl-3"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        placeholder="Write your Comment here"
                        name="blog"
                        cols="30"
                        rows="5"
                    >
                    </textarea>
                </div>

                <div className="space-x-2">
                    <button 
                        className="bg-blue-700 w-10 hover:bg-blue-600 text-white p-2 rounded-md text-sm font-medium" 
                        onClick={handlePostUpload}
                    >
                        <i className="fa-solid fa-upload"></i>
                    </button>
                    <button 
                        className="bg-red-700 w-10 hover:bg-red-600 text-white p-2 rounded-md text-sm font-medium" 
                        onClick={handlePostDiscard}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>

            </div>
        </div>
    )
}
