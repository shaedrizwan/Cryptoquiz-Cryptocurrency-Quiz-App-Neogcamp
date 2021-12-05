import "./home.css"
import { HeroComponent, QuizListComponent } from "../../Components"

export function Home(){

    return(
        <div className="home-container">
            <HeroComponent/>
            <QuizListComponent/>
        </div>
    )
}