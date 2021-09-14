import { createContext, useContext, useEffect,useState } from 'react';
import axios, { AxiosError } from 'axios';
import {ServerError,QuizData, QuizType} from '../Types/quizContext';

export const QuizContext = createContext(undefined);

export function useQuiz(){
    return useContext(QuizContext)
}

export const getQuiz = async() =>{
    try{
        const response = await axios.get<QuizData>('https://cryptoquiz.herokuapp.com/quiz')
        return response.data.quizData
    }catch(error){
        if(axios.isAxiosError(error)){
            const serverError = (error as AxiosError<ServerError>)
            if(serverError && serverError.response){
                return serverError.response.data
            }
        }else{
            return {errorMessage:"Something went wrong"}
        }
    }
}

export function QuizProvider({children}){

    const [quiz,setQuiz] = useState<QuizType[] | undefined>()
    const [error,setError] = useState<ServerError>()

    useEffect(()=>{
        (
            async function(){
                const quizData:QuizType[] | ServerError = await getQuiz()
                if("errorMessage" in quizData)
                    setError(error) 
                else{
                    setQuiz(quizData)
                }
            }
        )()
    },[])
    
    return(
    <QuizContext.Provider value={{quiz}}>
        {children}
    </QuizContext.Provider>
    )
}
