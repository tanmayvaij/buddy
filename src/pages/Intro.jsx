import { Link } from "react-router-dom";

export default function Intro() {
    return (
        <div id="Intro" className="flex  flex-col items-center justify-center min-h-[calc(100vh-48px)]">
            <img className="w-96 bg-white border rounded-full p-3" src="success.png" alt="" />
            <div className="m-8">
                <Link to="/signin" className="bg-gray-800 hover:bg-gray-900 text-white rounded-md font-medium py-2 px-3">Sign In</Link>
                <Link to="/signup" className="ml-4 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-medium py-2 px-3">Sign Up</Link>
            </div>
        </div>
    )
}
