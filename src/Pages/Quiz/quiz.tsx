import { useParams } from "react-router"
import { QuizComponent } from "../../Components"

export function Quiz(){

    const {id} = useParams()

    return(
        <div className="quiz-container">
            <QuizComponent id={id}/>
        </div>
    )
}