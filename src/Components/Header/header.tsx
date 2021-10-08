import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import "./header.css"


export default function Header(){

    const {login} = useAuth()

    return(
        <div className="header-container">
            <Link to="/" className="logo">CryptoQuiz</Link>
            <Link className="nav-items" to="/login">{login?"Logout":"Login"}</Link>
            {/* <Link className="nav-items" to="/signup">Signup</Link> */}
        </div>
    )
}