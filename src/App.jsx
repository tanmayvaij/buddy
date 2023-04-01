import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"

import AuthBar from "./components/AuthBar"
import Navbar from "./components/Navbar"

import { GlobalStates } from "./context"

import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import PostUploader from "./pages/PostUploader"
import SinglePost from "./pages/SinglePost"

import Signin from "./pages/Signin"
import Signup from "./pages/Signup"


function RoutesWithUser() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={ <Posts/> } />
            <Route exact path="/upload" element={ <PostUploader/> } />
            <Route exact path="/user/:email" element={ <Profile/> } />
            <Route exact path="/post/:post_id" element={ <SinglePost/> } />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </>
    )
}

function RoutesWithoutUser() {
    return (
        <>
        <AuthBar/>
        <Routes>
            <Route exact path="/" element={ <Signin/> } />
            <Route exact path="/signup" element={ <Signup/> } />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </>
    )
}

export default function App() {

    const { user } = GlobalStates()

    return (
        <BrowserRouter>
            { user? <RoutesWithUser/> : <RoutesWithoutUser/> }           
        </BrowserRouter>
    )
    
}
