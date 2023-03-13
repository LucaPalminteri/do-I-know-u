export type game = {
    id:string,
    created_at:string,
    players_count:number,
    code:string
}

export type player_game = {
    id:string,
    game:string,
    username:string,
    created_at:string,
    isReady: boolean,
    place: number,
    points?: number
}

export type model_player_game = {
    id:string,
    game:string,
    username:string,
    created_at:string,
    isReady: boolean,
    place: number,
    games: game
}

export type game_player_game = {
    id:string,
    created_at:string,
    players_count:number,
    code:string,
    players_games:Array<player_game>
}

export type question = {
    id:string,
    created_at:string,
    question: string,
    option_1: string,
    option_2: string,
    option_3: string,
    option_4: string,
    option_5: string
}

export type iQuestion = {
    question: string,
    option_1: string,
    option_2: string,
    option_3: string,
    option_4: string,
    option_5: string
}

export type questions_games = {
    id?: number,
    created_at: Date,
    question_id: number,
    game_id: string,
    answered_count?: number,
    player_turn?: string
}

export type token = {
    code:string,
    player:string
}

export type player_question = {
    id?:number,
    created_at:Date,
    player:string,
    question:number,
    option:number
}

export type model_player_question = {
    id: string,
    created_at:Date,
    players_count:number,
    code: string,
    hasStarted:boolean,
    players_games: player_game,
    questions_games: questions_games
}