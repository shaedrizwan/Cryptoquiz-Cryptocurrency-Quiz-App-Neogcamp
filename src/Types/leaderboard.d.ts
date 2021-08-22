export type UserType = {
    firstname:string;
    lastname:string;
    email:string;
    password:string;
}

export type LeaderboardType = {
    _id?:string;
    score:number;
    user:UserType;
}

export type LeaderBoardResponseType = {
    success: boolean;
    leaderboard: LeaderboardType[]
}