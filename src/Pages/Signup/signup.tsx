import axios, {AxiosError} from "axios"
import { useState } from "react"
import {BlockLoading} from "react-loadingg"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import { ServerError } from "../../Types/quizContext"
import "./signup.css"

type RegisterResponseType = {
    success:boolean,
    newUsesr:string
}


export function Signup(){

    const [loader,setLoader] = useState(false)
    const [newUser,setNewUser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const inputChangeHandler = (e) =>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const registerButtonPressed = async () =>{
        try{
            setLoader(true)
            const response = await axios.post<RegisterResponseType>("https://cryptoquiz.herokuapp.com/user/signup",newUser)
            if(response.status === 200){
                toast.success("Registered Successfully!")
                navigate('/login')
            }
        }catch(error){
            if(axios.isAxiosError(error)){
                const serverError = (error as AxiosError<ServerError>)
                if(serverError && serverError.response){
                    return serverError.response.data
                }
            }else{
                return {errorMessage:"Something went wrong"}
            }
        }finally{
            setLoader(false)
        }
    }

    return(
        <div className="register">
            <div className="card card-pr register-container">
                <h3 className="register-title">Register</h3>
                <div className="register-label">First Name</div>
                <input className="form-input" onChange={inputChangeHandler} name="firstname" type="text" />
                <div className="register-label">Last Name</div>
                <input className="form-input" onChange={inputChangeHandler} name="lastname" type="text" />
                <div className="register-label">Email</div>
                <input className="form-input" onChange={inputChangeHandler} name="email" type="text" />
                <div className="register-label">Password</div>
                <input className="form-input" onChange={inputChangeHandler} name="password" type="password" />
                <a className="btn btn-sec button" onClick={registerButtonPressed}>Register</a>
                {loader && <BlockLoading/>}
            </div>
        </div>
    )
}