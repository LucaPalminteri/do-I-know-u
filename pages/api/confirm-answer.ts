import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_question, model_player_question, questions_games } from "@/types/types";

export default async function joinGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {
    let { option, code, player } = req.body

    let player_question:player_question = {
        created_at: new Date(),
        player: '',
        question: 0,
        option
   }

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

        let player_answer = await supabase.from("players_questions")
            .select("*, questions_games(*)")
            .eq('question',game.questions_games[0].id)
            .eq('player',game.players_games[0].id)

        if (player_answer.data == undefined) return
            
        if (player_answer.data.length > 0) {
            res.status(208).json({"message": "The player already chose an answer"});
            return;
        }

        if (game.questions_games.length == 0) {
            res.status(208).json({"message":"todos respondieron la pregunta"});
            return;
        }

        player_question.player = game.players_games[0].id;
        player_question.question = game.questions_games[0].id

        let players_questions = await supabase
            .from('players_questions')
            .select()
            .eq('player',player_question.player)

        if( players_questions.data == undefined) return;

        await supabase
            .from("players_questions")
            .insert(player_question)

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
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
