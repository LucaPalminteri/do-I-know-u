import { class_game_question_game, player_game, questions_games } from "@/types/types";
export class GameQuestionGame {
    id: string;
    created_at: string;
    players_count: number;
    code: string;
    hasStarted: boolean;
    players_games: player_game
    question_game: questions_games;

    public constructor(gameQuestionGame: Array<class_game_question_game>) {
        this.id = gameQuestionGame[0].id;
        this.created_at = gameQuestionGame[0].created_at;
        this.players_count = gameQuestionGame[0].players_count
        this.code = gameQuestionGame[0].code
        this.hasStarted = gameQuestionGame[0].hasStarted
        this.players_games = gameQuestionGame[0].players_games[0]
        this.question_game = gameQuestionGame[0].questions_games[0]
    }
}

export class PlayerGame {
    id: string;
    game: string;
    username: string;
    created_at: string;
    isReady: boolean;
    place: number
    constructor(playerID: string) {
        this.id = playerID;
        this.game = ''
        this.username = ''
        this.created_at = ''
        this.isReady = false
        this.place = 1
    }

}