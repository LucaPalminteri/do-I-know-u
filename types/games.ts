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
    isReady: number
}

export type game_player_game = {
    id:string,
    created_at:string,
    players_count:number,
    code:string,
    players_games:Array<player_game>
}