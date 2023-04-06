import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalStates } from "../context"
import MessageButton from "./MessageButton"

export default function Info() {

    const { email } = useParams()

    const { user } = GlobalStates()

    const [ profileDetails, setProfileDetails ] = useState()

    // fetching user details from realtime database
    const getProfileDetails = async () => {

        const res = await fetch(`https://iron-envelope-379712-default-rtdb.firebaseio.com/users/${email}.json`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = await res.json()

        setProfileDetails(data)

    }

    useEffect(() => {
        getProfileDetails()
    }, [email])

    return (
        <div id="Info" className=" bg-orange-200  w-full mb-3 flex-col flex items-center justify-center space-x-4">

            <div className="flex items-center justify-center">
                <img className="rounded-full bg-white border-4  m-5 w-40" src={profileDetails?.photo ?? "/person.png"} alt="" />
                <h2 className="text-xl">{email}</h2>
            </div>

            { (user.email.split("@")[0] != email) && <MessageButton userEmail={email} /> }

        </div>
    )
}
