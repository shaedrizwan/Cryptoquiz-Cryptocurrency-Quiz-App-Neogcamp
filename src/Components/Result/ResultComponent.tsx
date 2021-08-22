
import { useScore } from "../../Contexts/scoreContext"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import "./ResultComponent.css"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import "../../softui.css"

export function ResultComponent(){
    const {id} = useParams()
    const {score}:{score:number} = useScore()
    const { width, height } = useWindowSize()
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
            <div className="btn-container">
                <Link to={`/quiz/${id}`} className="btn btn-pr">Play again</Link>
                <Link to="/" className="btn btn-sec">Play other Quiz</Link>
            </div>

        </div>
    )
}