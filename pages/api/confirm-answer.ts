import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { PlayerQuestion } from "@/classes/QuestionGame";
import { getPlayersQuestionsByQuestionAndPlayer } from "@/utils/databaseFunctions";
import { game_player_game, game_question_game } from "@/types/types";

export default async function joinGame(req: NextApiRequest, res: NextApiResponse<Object | null>) {
    let { option, code, player } = req.body

    try {

        let game:any = await getGameAndPlayerGame(code, player)
        // console.log(asa);
        // let { data, error } = await supabase
        //     .from("games")
        //     .select("*, players_games (*), questions_games(*)")
        //     .eq('code',code)
        //     .eq('players_games.username',player)
        //     .eq('questions_games.isReady',false)
            
        // if (error) res.status(500).json(error);
        // if (data == null) return;
        
        // let [ game ] = data
        let player_answer = await getPlayersQuestionsByQuestionAndPlayer(game.questions_games[0].id, game.players_games[0].id)

        if (player_answer == undefined) return
            
        if (player_answer.length > 0) {
            res.status(208).json({"message": "The player already chose an answer"});
            return;
        }

        if (game.questions_games.length == 0) {
            res.status(208).json({"message":"todos respondieron la pregunta"});
            return;
        }

        let playerQuestion = new PlayerQuestion(game.players_games[0].id, game.questions_games[0].id, option) 

        await supabase
            .from("players_questions")
            .insert(playerQuestion)

        await supabase
        .from('questions_games')
        .update({answered_count: game.questions_games[0].answered_count + 1})
        .eq('id', game.questions_games[0].id)

        if (game.players_count - 1 == game.questions_games[0].answered_count) {

            let newQuestion = Math.floor(Math.random() * 16) + 5

            while (newQuestion == game.questions_games[0].question_id) {
                newQuestion = Math.floor(Math.random() * 16) + 5
            }

            await supabase  
                .from('questions_games')
                .update({isReady:true})
                .eq('id',game.questions_games[0].id)

            await supabase
                .from('questions_games')
                .insert({game_id:game.id,question_id: Math.floor(Math.random() * 16) + 5})
        }
        
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getGameAndPlayerGame(code: string, player:string) {
    let { data, error } = await supabase
    .from("games")
    .select("*, players_games (*), questions_games(*)")
    .eq('code', code)
    .eq('players_games.username', player)
    .eq('questions_games.isReady', false)

    if (data == null || data == undefined) return [];

    let game:game_question_game = {
        id: data[0].id,
        created_at: data[0].created_at,
        players_count: data[0].player_count,
        code: data[0].code,
        hasStarted: data[0].hasStarted,
        players_games: data[0].players_games[0],
        question_game: data[0].questions_games[0]
    }
    return game;
}