import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../../Contexts/quizContext"
import { useScore } from "../../Contexts/scoreContext"
import { QuizType } from "../../Types/quizContext"
import "./quiz.css"
import "../../softui.css"


export function QuizComponent({id}){
    const {quiz}:{quiz:QuizType[]} = useQuiz()
    const navigate = useNavigate()
    const {score,setScore}:{score:number,setScore:React.Dispatch<React.SetStateAction<number>>} = useScore()
    const [questionNum,setQuestionNum] = useState<number>(0)
    const selectedQuiz:QuizType = quiz.find(item => item._id === id)
    const totalQuestions:number = selectedQuiz.questions.length
    const [style,setStyle] = useState({status:false,selected:""})
    

    // const resetTimer = () =>{
    //     setTimer(5)
    // }

    useEffect(()=>{
        setScore(0)
    },[])

    // useEffect(()=>{
    //     if(timer > 0){
    //         setTimeout(()=>setTimer(timer =>timer -1), 1000);
    //     }
    //     if(timer === 0){
    //         if(questionNum < totalQuestions-1){
    //             setQuestionNum((questionNum)=>questionNum+1)
    //             resetTimer()
    //         }else{
    //             navigate(`/result/${id}`)
    //         }
    //     }
    // },[setTimer,timer])

    function answerHandler({option,id}:{option:boolean,id:string}){
        setStyle({...style,status:true,selected:id})
        setTimeout(()=>{
            if(option){
                setScore((score:number)=> score + 5)
            }
            if(questionNum < totalQuestions-1){
                setStyle({...style,status:false,selected:""})
                setQuestionNum((questionNum:number)=>questionNum+1)
                // resetTimer()
            }else{
                navigate(`/result/${selectedQuiz._id}`)
            }
        },500)
    }

    const updateStyle = (isRight,id) =>{
        if(isRight){
            return {backgroundColor:"#68C086"}
        }else if(!isRight && style.selected === id){
            return {backgroundColor:"#E82929"}
        }
        else{
            return {backgroundColor:"#white"}
        }
    }

    return(
        <div className="quiz-container">
            <div className="score-card">
                <div className="quiz-data">Question number:{questionNum + 1}</div>
                <div className="quiz-data"></div>
                <div className="quiz-data">Score: {score}</div>
            </div>
            <div className="card card-pr">
                <div className="quiz-question">Question:</div>
                <div className="question">{selectedQuiz.questions[questionNum].question}</div>
                <div className="quiz-option-text">Options:</div>
                {selectedQuiz.questions[questionNum].options.map(opt=>{
                    return <div className="option" key={opt._id} style={style.status?updateStyle(opt.isRight,opt._id):{backgroundColor:"white"}} onClick={()=>answerHandler({option:opt.isRight,id:opt._id})}>{opt.option}</div>
                })}
            </div>
        </div>
    )
}