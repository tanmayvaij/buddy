import { Link } from "react-router-dom"

export default function PostCard(props)  {

    return (
        <Link className=" border-b-2 bg-white p-1 mt-2 border-gray-300 mb-7 rounded-md" to={`/post/${props?.id}`}  key={props?.id}>
            <div className="flex text-left items-center space-x-1 p-1">
                <img className="rounded-full w-8" src={props?.user_photo} alt="" />
                <p className="text-sm">{props?.email}</p>
            </div>
            <img className="w-[20rem] h-[20rem] sm:w-[27rem] sm:h-[27rem]" src={props?.image ?? "placeholder.webp"} alt="" />
        </Link>
    ) 
}
