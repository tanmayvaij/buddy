import { createRoot } from "react-dom/client"
import App from "./App"
import Context from "./context"
import "./index.css"

const root = document.getElementById("root")

createRoot(root).render(
    <Context>
        <App/>
    </Context>
)
