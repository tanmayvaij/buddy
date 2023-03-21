import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth } from "../firebaseConfig"

export default function Signup() {

    const navigate = useNavigate()

    const googleProvider = new GoogleAuthProvider()

    const [ cred, setCred ] = useState({ email: "", password: "", cpassword: "" })

    const signUp = () => {
        signInWithPopup(auth, googleProvider)
        .then(()=>{
            navigate("/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const customEmailSignUp = () => {

        if (cred.password != cred.cpassword) return alert("Passwords mismatch!") 

        createUserWithEmailAndPassword(auth, cred.email, cred.password)
        .then(() => {
            navigate("/")
        })
        .catch(err => {
            if (err.message == "Firebase: Error (auth/email-already-in-use).") return alert("Email already in use")
        })

    }

    return (
        <div id="signup" className="flex items-center justify-center min-h-[calc(100vh-48px)]">
            <div className="border px-8 py-16 rounded-md space-y-3">
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
                        placeholder="Set Password" 
                        type="password" 
                        name="password" 
                        value={cred.password}
                        onChange={(e) => setCred({ ...cred, [e.target.name]: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        className="border rounded-md focus:outline-indigo-500 border-gray-300 w-72 h-10 pl-3" 
                        placeholder="Confirm Password" 
                        type="password" 
                        name="cpassword" 
                        value={cred.cpassword}
                        onChange={(e) => setCred({ ...cred, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="text-center">
                    <button 
                        onClick={customEmailSignUp}
                        className="font-medium w-full text-sm px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="text-center">
                    <h3 className="font-medium text-gray-600">OR</h3>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        onClick={signUp} 
                        className="border bg-white hover:bg-slate-50 px-3 py-2 rounded-md w-full flex items-center justify-center" 
                    >
                        <img className="w-6" src="glogo.png" alt="" /> 
                        <span className="text-sm font-medium pl-3">Sign Up with Google</span> 
                    </button>
                </div>
                <div className="font-medium text-sm text-center pt-10">
                    <p>Already have an Account ?</p>
                    <p>
                        <Link className="text-blue-700 hover:underline" to="/signin">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
