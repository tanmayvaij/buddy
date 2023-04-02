import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebaseConfig"

export default function Signin() {

    const [cred, setCred] = useState({ email: "", password: "" })

    const navigate = useNavigate()

    const googleProvider = new GoogleAuthProvider()

    const signIn = () => {
        signInWithPopup(auth, googleProvider)
        .then( async () => {
            navigate("/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const CustomEmailSignIn = () => {
        
        signInWithEmailAndPassword(auth, cred.email, cred.password)
        .then(() => {
            navigate("/")
        })
        .catch(err => {
            if (err.message == "Firebase: Error (auth/wrong-password).") return alert("Invalid Credentials")
        })

    }

    return (
        <div id="signin" className="flex flex-wrap items-center justify-center min-h-[calc(100vh-52px)]">
            <img className="rounded-l-md hidden md:block w-[359px]  h-[536.35px]" src="social.jpg" alt="" />
            <div className="border px-8 py-16 space-y-3 bg-white md:rounded-r-md">
                <div className="flex items-center justify-center">
                    <img className="w-16 mb-5" src="favicon.png" alt="" />
                </div>
                <div>
                    <input 
                        className="border rounded-md focus:outline-indigo-500 border-gray-300 w-72 h-10 pl-3" 
                        placeholder="Email address" 
                        type="text" 
                        name="email" 
                        value={cred.email}
                        onChange={(e) => setCred({ ...cred, [e.target.name]: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        className="border rounded-md focus:outline-indigo-500 border-gray-300 w-72 h-10 pl-3" 
                        placeholder="Password" 
                        type="password" 
                        name="password" 
                        value={cred.password}
                        onChange={(e) => setCred({ ...cred, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="text-center">
                    <button 
                        onClick={CustomEmailSignIn}
                        className="font-medium w-full text-sm px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Sign In
                    </button>
                </div>
                <div className="text-center">
                    <h3 className="font-medium text-gray-600">OR</h3>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={signIn} className="border bg-white hover:bg-slate-50 px-3 py-2 rounded-md w-full flex items-center justify-center" >
                        <img className="w-6" src="glogo.png" alt="" /> 
                        <span className="text-sm font-medium pl-3">Continue with Google</span> 
                    </button>
                </div>
                <div className="font-medium text-sm text-center pt-10">
                    <p>Don't have an Account ?</p>
                    <p>
                        <Link className="text-blue-700 hover:underline" to="/signup">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
