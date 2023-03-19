import { NavLink } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
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

            <div className="space-x-4 flex items-center">
                <NavLink to="/">
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-house"></i>
                </NavLink>
                <NavLink to="/myblogs">
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-book"></i>
                </NavLink>
            </div>

            <img className="w-10" src="favicon.png" alt="" />

            <div className="flex items-center">
                <img className="rounded-full w-8" src={user.photoURL} alt="" />
                <button className="pl-3" onClick={GoogleSignOut}>
                    <i className="hover:bg-white hover:text-gray-800 border p-2 rounded-md fa-solid fa-door-open"></i>
                </button>
            </div>

        </div>
    )

}
