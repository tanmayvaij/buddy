import { Link } from "react-router-dom"
import { GlobalStates } from "../context"

export default function AppUsers() {

    const { appUsers } = GlobalStates()

    return (
        <div id="AppUsers" className="overflow-x-scroll w-full text-white flex p-2 bg-gray-900 items-center ">

            {
                appUsers.map((val) => {
                    return (
                        <div key={val?.uid} className="mx-3 text-center">
                            <Link className="border-4 p-[1px] inline-block rounded-full bg-white hover:border-amber-500 border-orange-300" key={val.uid} to={`/user/${val.email}`}>
                                <img className="w-12 rounded-full" src={ val?.photo ?? "/person.png" } alt="" />
                            </Link>
                            <p className="text-xs">{val?.email}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}
