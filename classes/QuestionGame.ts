import { player_game } from "@/types/types";

export class QuestionGame 
{
    created_at =  new Date();
    question_id = Math.floor(Math.random() * 16) + 5;
    game_id:string;
    answered_count = 0;
    player_turn:string

    constructor(gameID:string,playerTurn:player_game)
    {
        this.game_id = gameID;
        this.player_turn = playerTurn.id;
    }
}