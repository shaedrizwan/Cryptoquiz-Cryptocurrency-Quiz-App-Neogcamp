import { Link } from "react-router-dom"
import "./RulesComponent.css"
import { Id } from "../../Types/quiz"
import "../../softui.css"

export function RulesComponent({id}:Id){
    return(
        <div className="card card-pr">
            <div className="rules-div">
                <div className="rules-title">Quiz Rules</div>
                <ol>
                    <li className="rules-items">Each correct answer gives you 5 points</li>
                    <li className="rules-items">No negative points</li>
                    <li className="rules-items">There will be 5 total questions</li>
                    <li className="rules-items">Answer once submitted cannot be changed</li>
                    <li className="rules-items">All questions must be answered in sequential order</li>
                </ol>
            </div>
            <div className="leaderboard-div"></div>
            <Link to={`/quiz/${id}`} className="btn btn-scs">Start Quiz</Link>
        </div>
    )
}