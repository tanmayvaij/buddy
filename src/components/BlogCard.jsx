import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import * as fireDatabase from "firebase/database"
import { db } from "../firebaseConfig";
 
export default function BlogCard(props)  {

    const loc = useLocation()

    const deleteBlogPost = () => {

        const ans = prompt("Enter 'yes' to delete")

        if (ans == 'yes') {
            fireDatabase.remove(fireDatabase.ref(db, `blogs/${props.author_id}/${props?.id}`))
            .then(() => {
                alert("Deleted Successfully")
            })
            .catch(err => {
                console.log(err)
            })
        }

    }

    return (
        <div className="flex flex-col">
            <Link to={`/blog/${props.author_id}/${props?.id}`} className="flex flex-col items-center justify-center m-4 p-3 rounded-md blogcard w-80" key={props?.id}>
                <h2 className="h-20 p-3 font-bold">{props?.title.slice(0, 50)}...</h2>
                <img className="rounded w-72 h-60" src={props?.image} alt="" />
                <p className="m-3">
                    {props?.blog.slice(0, 150)} <span className="text-gray-500 font-medium">...Continue</span>
                </p>
            </Link>

            { 
                (loc.pathname=="/myblogs") && 

                <button onClick={deleteBlogPost} className="border rounded-md p-1 mx-4 mb-4  hover:bg-red-300">
                    <i className="fa-solid fa-trash"></i>
                </button>
            }


        </div>
    )
}
