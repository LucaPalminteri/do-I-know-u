import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_question } from "@/types/types";
import { getPlayerAnswer, getPlayers, getPlayersQuestions, insertPlayerQuestion } from "@/utils/databaseFunctions";

export default async function joinGame(req: NextApiRequest, res: NextApiResponse<Object | null>) {
    let { option, code, player } = req.body

    try {

        let { data, error } = await supabase
            .from("games")
            .select("*, players_games (*), questions_games(*)")
            .eq('code',code)
            .eq('players_games.username',player)
            .eq('questions_games.isReady',false)
            
        if (error) res.status(500).json(error);
        if (data == null) return;
        
        let [ game ] = data

        let player_answer = await getPlayerAnswer(game.questions_games[0].id, game.players_games[0].id)
            
        if (player_answer.length > 0) {
            res.status(208).json({"message": "The player already chose an answer"});
            return;
        }

        let player_question:player_question = {
            created_at: new Date(),
            player: game.players_games[0].id,
            question: game.questions_games[0].id,
            option
       }

        let players_questions = await getPlayersQuestions(player_question.player)

        await insertPlayerQuestion(player_question)

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

            let players = await getPlayers(game.id)

            await supabase
                .from('questions_games')
                .insert({game_id:game.id,question_id: Math.floor(Math.random() * 16) + 5,player_turn:'2ad11d4b-fb26-4b84-8b77-516ee4d7e56d'})
        }
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}