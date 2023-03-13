export class QuestionGame
{
    created_at:Date = new Date();
    question_id:number = Math.floor(Math.random() * 16) + 5;
    answered_count:number = 0;
    
    game_id:string;
    player_turn:string;

    constructor(gameID:string, playerTurn:string)
    {
        this.game_id = gameID;
        this.player_turn = playerTurn
    }
}