import { Link } from "react-router-dom";
import "./header.css"


export default function Header(){
    return(
        <div className="header-container">
            <Link to="/" className="logo">CryptoQuiz</Link>
            <Link className="nav-items" to="/login">Login</Link>
            {/* <Link className="nav-items" to="/signup">Signup</Link> */}
        </div>
    )
}