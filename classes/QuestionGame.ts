export class QuestionGame {
    created_at = new Date();
    question_id = Math.floor(Math.random() * 16) + 5;
    game_id: string;
    answered_count = 0;
    player_turn: number

    constructor(gameID: string, playerTurn: number) {
        this.game_id = gameID;
        this.player_turn = playerTurn;
    }
}

export class PlayerQuestion {
    player: string;
    question: number;
    option: number;

    constructor(player: string, question: number, option: number) {
        this.player = player;
        this.question = question;
        this.option = option
    }
}