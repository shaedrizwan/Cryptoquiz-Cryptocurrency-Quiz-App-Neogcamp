import axios from "axios";
import { getQuiz } from "../Contexts/quizContext";

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Get Quiz from API",()=>{
    it("should get Quiz data when API call is success",async ()=>{
        mockedAxios.get.mockResolvedValue({
            data:{
                success:true,
                quizData:[{
                    _id:"12345",
                    name:"Crypto Lingo - 101",
                    description:"This is a description",
                    totalQuestions:10,
                    questions:[{
                        _id:"12233",
                        question:"Who is the founder of Eth?",
                        options:[{
                            _id:"2344",
                            option:"Vitalik",
                            isRight:true
                        },{
                            _id:"234455",
                            option:"Satoshi",
                            isRight:false
                        }]
                    }]
                }]
            }
        })

        const quiz = await getQuiz()

        expect(quiz).toEqual([{
            _id:"12345",
            name:"Crypto Lingo - 101",
            description:"This is a description",
            totalQuestions:10,
            questions:[{
                _id:"12233",
                question:"Who is the founder of Eth?",
                options:[{
                    _id:"2344",
                    option:"Vitalik",
                    isRight:true
                },{
                    _id:"234455",
                    option:"Satoshi",
                    isRight:false
                }]
            }]
        }])
    })

    it("should return axios error when API fails and error is because of axios",async ()=>{
        mockedAxios.get.mockRejectedValue({
            response:{
                data:{
                    errorMessage:"Axios error"
                }
            }
        })

        mockedAxios.isAxiosError.mockImplementation((_)=>true)
        const quiz = await getQuiz()

        expect(quiz).toEqual({
            errorMessage:"Axios error"
        })
    })

    it("should return error if the API call did not happen/unknown error",async ()=>{
        mockedAxios.get.mockRejectedValue({errorMessage:"Something went wrong"})

        const quiz = await getQuiz()

        expect(quiz).toEqual({errorMessage:"Something went wrong"})
    })
})