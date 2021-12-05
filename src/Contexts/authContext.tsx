import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

toast.configure()

const authContext = createContext(undefined)

export const useAuth = () =>{
    return useContext(authContext)
}

type StateType = {
    from: string;
}

export const AuthProvider = ({children}) =>{

    const [login,setLogin] = useState<boolean>(false)
    const [token,setToken] = useState<string>("")
    const [loader,setLoader] = useState<boolean>(false)
    const navigate = useNavigate()
    const {state}:{state:any} = useLocation()

    useEffect(()=>{
        const loginStatus = JSON.parse(localStorage?.getItem("login"))
        loginStatus?.isLoggedIn && setLogin(true)
        loginStatus?.isLoggedIn && setToken(loginStatus.token)
    },[])

    useEffect(()=>{
        (
            function(navigate){
                const UNAUTHORIZED = 401
                axios.interceptors.response.use(
                    (response) => response,
                    (error) =>{
                        if(error?.response?.status === UNAUTHORIZED){
                            logoutUser();
                            navigate('/login')
                        }
                        return Promise.reject(error)
                    }
                )
            }
        )(navigate)
    },[navigate])

    const loginUser = async (email:string,password:string) =>{
        try{
            setLoader(true)
            const response = await axios.post('https://cryptoquiz.herokuapp.com/user/login',{
                email:email,
                password:password
            })
            if(response.status === 200){
                setLogin(true)
                toast.success("Successfully Logged In",{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                setToken(response.data.token)
                localStorage?.setItem("login",JSON.stringify({isLoggedIn:true,token:response.data.token}))
                state != null ?navigate(state.from):navigate('/')
            }
        }catch(error){
            toast.error("Login failed! Invalid Username/Password",{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose:3000
            })
        }finally{
            setLoader(false)
        }
    }


    const logoutUser = () =>{
        setLogin(false)
        setToken("")
        localStorage?.removeItem("login")
    }

    return(
        <authContext.Provider value={{login,token,loginUser,logoutUser,loader}}>
        {children}
        </authContext.Provider>
    )
}