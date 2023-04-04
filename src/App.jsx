import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"

import AuthBar from "./components/AuthBar"
import Navbar from "./components/Navbar"

// super global variables
import { GlobalStates } from "./context"

// pages to show when user is authenticated
import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import PostUploader from "./pages/PostUploader"
import SinglePost from "./pages/SinglePost"
import Chat from "./pages/Chat"

// pages to show when user is not authenticated
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import AllChats from "./pages/AllChats"

function RoutesWithUser() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={ <Posts/> } />
            <Route exact path="/upload" element={ <PostUploader/> } />
            {/* <Route exact path="/allchats" element={ <AllChats/> } /> */}
            <Route exact path="/chat/:chatid" element={ <Chat/> } />
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
