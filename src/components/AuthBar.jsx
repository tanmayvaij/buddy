import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

export default function AuthBar() {

    const loc = useLocation()

    return (
        <div id="authbar" className={`flex items-center justify-between px-10 text-center text-blue-400 bg-gray-900`}>

            <div className="flex items-center">
                <img className="w-10" src="favicon.png" alt="" />
                <h1 className="font-medium text-2xl p-2 ">A Simple Blogger</h1>
            </div>

            {
                (loc.pathname!="/") &&
                <Link to="/">
                    <i className="text-white fa-solid fa-arrow-left"></i>
                </Link>
            }

        </div>      
    )
}
