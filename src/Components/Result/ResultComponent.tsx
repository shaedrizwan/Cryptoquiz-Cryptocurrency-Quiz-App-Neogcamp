
import { useScore } from "../../Contexts/scoreContext"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import "./ResultComponent.css"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import "../../softui.css"
import { useEffect, useState } from "react"
import axios, {AxiosError} from "axios"
import { useAuth } from "../../Contexts/authContext"
import { ServerError } from "../../Types/quizContext"

export function ResultComponent(){
    const {id} = useParams()
    const {score}:{score:number} = useScore()
    const { width, height } = useWindowSize()
    const {login,token} = useAuth()
    const [rank,setRank] = useState<number | undefined>()
    const [error,setError] = useState<ServerError>()

    type QuizRank = {
        success: boolean;
        rank: number
    }

    const updateLeaderboard = async () =>{
        try{
            const response = await axios.post<QuizRank>("https://cryptoquiz.herokuapp.com/quiz/addToLeaderboard",{
                        quizId:id,
                        score:score
                    },{
                        headers:{
                            Authorization:token
                        }
                    })
            return response.data.rank
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

    useEffect(()=>{
        if(login){
            (
                async function(){
                    const rank:number | ServerError = await updateLeaderboard()
                    if(typeof(rank) === "number")
                        setRank(rank)
                    else{
                        setError(rank)
                    }
                }
            )()
        }
    },[id,score])

    return(
        <div className="result-container">
            {score > 30 && 
                <div>
                    <div className="title-h1">Congratulations!🎉 Your score is: <span className="score">{score}</span></div>
                    <Confetti
                    width={width}
                    height={height}
                    />
                </div>}
            {score <= 30 && <div className="title-h1"> Your score is <span className="score">{score}</span>.Play again to improve your score</div>}
            {!login && <div className="title-h2">To add your score to the leaderboard, please login!</div>}
            {login && rank && <div className="title-h2">Your rank is <span className="score">{rank}</span> in the Leaderboard🎉</div>}
            <div className="btn-container">
                <Link to={`/quiz/${id}`} className="btn btn-pr">Play again</Link>
                <Link to="/" className="btn btn-sec">Play other Quiz</Link>
            </div>

        </div>
    )
}