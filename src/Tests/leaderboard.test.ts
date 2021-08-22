import { GetLeaderboard } from "../Components/Leaderboard/Leaderboard";
import axios from 'axios'

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Get leaderboard details",()=>{
    it("should return leaderboard data on API success",async()=>{
        mockedAxios.post.mockResolvedValue({
            data:{
                success:true,
                leaderboard:[{
                    _id:"4567",
                    user:{
                        _id:"123",
                        firstName:"Shahid"
                    },
                    score:50
                },{
                    _id:"87637",
                    user:{
                        _id:"48652",
                        firstName:"Rizwan"
                    },
                    score:40
                }]
            }
        })

        const leaderboard = await GetLeaderboard("123")
        expect(leaderboard).toEqual([{
            _id:"4567",
            user:{
                _id:"123",
                firstName:"Shahid"
            },
            score:50
        },{
            _id:"87637",
            user:{
                _id:"48652",
                firstName:"Rizwan"
            },
            score:40
        }])

    })

    it("should return axios error when API fails and error is because of axios",async ()=>{
        mockedAxios.post.mockRejectedValue({
            response:{
                data:{
                    errorMessage:"Axios error"
                }
            }
        })

        mockedAxios.isAxiosError.mockImplementation((_)=>true)
        const leaderboard = await GetLeaderboard("123")

        expect(leaderboard).toEqual({
            errorMessage:"Axios error"
        })
    })

    it("should return error if the API call did not happen/unknown error",async ()=>{
        mockedAxios.post.mockRejectedValue({errorMessage:"Something went wrong"})

        const leaderboard = await GetLeaderboard("54")

        expect(leaderboard).toEqual({errorMessage:"Something went wrong"})
    })
})