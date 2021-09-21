import { useState } from "react"
import { useAuth } from "../../Contexts/authContext"
import "./LoginComponent.css"
import {BlockLoading} from "react-loadingg"

export function LoginComponent(){

    let email,password
    const {login,loginUser,logoutUser,loader} = useAuth()

    const loginPressed = () =>{
        if(login){
            logoutUser()
        }else{
            loginUser(email,password)
        }
    }

    return(
        <div className="login">
            <div className="card card-pr login-container">
                <h3 className="login-title">Login</h3>
                { !login &&
                <>
                <div className="login-label">Username</div>
                <input className="form-input" type="text" onChange={(e)=>email = e.target.value}/>
                <div className="login-label">Password</div>
                <input className="form-input" type="password" onChange={(e)=>password = e.target.value}/>
                </>
                }
                {login && <div className="login-label">You're already logged in! Log out?</div>}
                <a className="btn btn-sec button" onClick={login?logoutUser:loginPressed}>{login?"Log Out":"Login"}</a>
                {loader && <BlockLoading/>}
            </div>
        </div>
    )
}