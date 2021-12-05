import { useQuiz } from "../../Contexts/quizContext"
import { Link } from "react-router-dom"
import "./QuizListComponent.css"
import { QuizType } from "../../Types/quizContext"
import {BlockLoading} from "react-loadingg"
import "../../softui.css"


export function QuizListComponent(){

    const {quiz}:{quiz:QuizType[]} = useQuiz()

    return(
        <div className="quizlist-container">
            <div className="quizlist-title">Select the Quiz</div>
            {!quiz && <BlockLoading/>}
            <div className="quizlist-grid">
                {quiz && quiz.map(({_id,name,description}) => {
                    return (
                    <Link className="card card-pr" to={`/rules/${_id}`} key={_id}>
                        <div className="card-heading">{name}</div>
                        <div className="card-body">{description}</div>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
}