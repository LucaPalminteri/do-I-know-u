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
    created_at:string
}