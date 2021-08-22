import { createContext,useContext,useState } from "react";

const scoreContext = createContext(undefined)

export const useScore = () =>{
    return useContext(scoreContext)
}

export const ScoreProvider = ({children}) =>{

    const [score,setScore] = useState<number>(0)

    return(
        <scoreContext.Provider value={{score,setScore}}>
        {children}
        </scoreContext.Provider>
    )
}