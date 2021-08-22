import { useParams } from "react-router"
import { Leaderboard, RulesComponent } from "../../Components"
import "./rules.css"

export function Rules(){

    const {id} = useParams()
    return(
        <div className="rules-container">
            <RulesComponent id={id}/>
            <Leaderboard id={id}/>
        </div>
    )
}