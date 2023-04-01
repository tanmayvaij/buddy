import { Link } from "react-router-dom"
import * as fireDatabase from "firebase/database"
import { db } from "../firebaseConfig"
 
export default function ProfilePostCard(props)  {

    return (

        <Link to={`/post/${props?.id}`} className="flex flex-col items-center justify-center rounded-md" key={props?.id}>
                
            <img className="w-72 h-72 m-1" src={props?.image} alt="" />
               
        </Link>
    )
}
