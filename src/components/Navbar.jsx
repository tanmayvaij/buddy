import { NavLink, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { GlobalStates } from "../context"

export default function Navbar() {

    const { user } = GlobalStates()

    const navigate = useNavigate()

    const GoogleSignOut = () => {
        signOut(auth)
        navigate("/")
    }

    return (
        <div id="Navbar" className="font-medium flex bg-slate-900 text-white items-center justify-between px-8 p-3">

            <NavLink to="/" className="flex items-center">
                <img className="w-8" src="/favicon.png" />
                <h1 className="font-medium text-2xl px-1 text-orange-400">uddy</h1>
            </NavLink>

            <div className="space-x-4 flex items-center">
                <NavLink to="/">
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-house"></i>
                </NavLink>
                <NavLink to="/upload">
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-upload"></i>
                </NavLink>
                <NavLink to={`/user/${user.email.split("@")[0]}`}>
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-user"></i>
                </NavLink>
            </div>

            <div className="flex items-center">
                <button className="pl-3" onClick={GoogleSignOut}>
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-door-open"></i>
                </button>
            </div>

        </div>
    )

}
