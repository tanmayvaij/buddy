import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Info() {

    const { email } = useParams()

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
    }, [])

    return (
        <div id="Info" className="flex items-center space-x-4">
            <img className="rounded-full border-4  m-5 w-40" src={profileDetails?.photo ?? "/person.png"} alt="" />
            <h2 className="text-xl">{email}</h2>
        </div>
    )
}
