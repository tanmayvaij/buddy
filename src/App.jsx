import { Routes, Route, BrowserRouter } from "react-router-dom"
import AuthBar from "./components/AuthBar"
import Navbar from "./components/Navbar"
import { GlobalStates } from "./context"
import Blogs from "./pages/Blogs"
import Intro from "./pages/Intro"
import MyBlogs from "./pages/MyBlogs"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import SingleBlog from "./pages/SingleBlog"

function RoutesWithUser() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={ <Blogs/> } />
            <Route exact path="/myblogs" element={ <MyBlogs/> } />
            <Route exact path="/blog/:author_id/:blog_id" element={ <SingleBlog/> } />
        </Routes>
        </>
    )
}

function RoutesWithoutUser() {
    return (
        <>
        <AuthBar/>
        <Routes>
            <Route exact path="/" element={ <Intro/> } />
            <Route exact path="/signin" element={ <Signin/> } />
            <Route exact path="/signup" element={ <Signup/> } />
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
