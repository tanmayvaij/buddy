import { Link } from "react-router-dom"

export default function PostCard(props)  {

    return (
        <Link className="m-4 scale-95 hover:scale-100 bg-white p-4 shadow-md rounded-md" to={`/post/${props?.id}`}  key={props?.id}>
            <div className="flex text-left items-center space-x-1 p-1">
                <img className="rounded-full w-8" src={props?.user_photo} alt="" />
                <p className="text-sm">{props?.email}</p>
            </div>
            <img className="w-[20rem] h-[20rem] sm:w-[20rem] sm:h-[20rem] pt-3" src={props?.image ?? "placeholder.webp"} alt="" />
            <p className="h-12 w-[20rem] text-gray-700 py-2">{props?.comment.slice(0, 75)}...</p>
        </Link>
    ) 
}
