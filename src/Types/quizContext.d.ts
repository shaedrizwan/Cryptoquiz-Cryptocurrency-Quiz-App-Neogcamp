export type ServerError = {
    errorMessage: string;
}

export type OptionsType = {
    _id:string;
    option:string;
    isRight:boolean;
}

export type QuestionsType = {
    _id:string;
    question:string;
    options: OptionsType[];
}

export type QuizType = {
    _id?:string;
    name:string;
    description:string;
    totalQuestions:number;
    questions:QuestionsType[];
}
export type QuizData = {
    success:boolean;
    quizData:QuizType[];
}