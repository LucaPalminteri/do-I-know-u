import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { PlayerQuestion } from "@/classes/QuestionGame";
import { getGameAndPlayerGame, getPlayers, getPlayersQuestionsByQuestionAndPlayer, insertPlayerQuestion, updateAnsweredCountInQuestionsGames, updateReadinessQuestionGame } from "@/utils/databaseFunctions";
import { game_question_game, player_game, questions_games } from "@/types/types";

export default async function joinGame(req: NextApiRequest, res: NextApiResponse<Object | null>) {
    let { option, code, player } = req.body

    try {
        let game:game_question_game | null = await getGameAndPlayerGame(code, player)

        if (game == null || game == undefined) return;
        if (game.question_game.answered_count == undefined) return;
        
        let player_answer = await getPlayersQuestionsByQuestionAndPlayer(game.question_game.question_id, game.players_games.id)

        if (player_answer.length > 0) {
            res.status(208).json({"message": "The player already chose an answer"});
            return;
        }

        let playerQuestion = new PlayerQuestion(game.players_games.id, Number(game.question_game.id), option) 

        await insertPlayerQuestion(playerQuestion)

        await updateAnsweredCountInQuestionsGames(game.question_game.answered_count + 1, game.question_game.id)

        if (game.players_count - 1 == game.question_game.answered_count) {

            let newQuestion = Math.floor(Math.random() * 16) + 5

            while (newQuestion == game.question_game.question_id) {
                newQuestion = Math.floor(Math.random() * 16) + 5
            }

            let questionGame:questions_games = await updateReadinessQuestionGame(game.question_game.id)

            let players = await getPlayers(game.id)

            const playersSortedByPlace = players?.sort((a:player_game, b:player_game) => a.place - b.place);

            let nextPlayer:player_game = playersSortedByPlace?.find((player:player_game) => player.place > questionGame.player_turn )

            if (questionGame.player_turn == playersSortedByPlace?.at(-1).place)  nextPlayer = playersSortedByPlace[0]

            await supabase
                .from('questions_games')
                .insert({game_id:game.id,question_id: newQuestion, player_turn:nextPlayer.place})
        }
        
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error });
    }
} 