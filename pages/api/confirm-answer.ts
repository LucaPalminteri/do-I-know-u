import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_question, model_player_question } from "@/types/types";

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
        if (data[0].questions_games.length == 0) {
            res.status(200).json({"message":"todos respondieron la pregunta"});
            return;
        }

        player_question.player = data[0].players_games[0].id;
        player_question.question = data[0].questions_games[0].id

        let aa = await supabase
            .from('players_questions')
            .select()
            .eq('player',player_question.player)

        if( aa.data == undefined) return;
        if (aa.data?.length > 0) res.status(200).json({"message": "The player already chose an answer"});

        await supabase
            .from("players_questions")
            .insert(player_question)

        await supabase
        .from('questions_games')
        .update({answered_count: data[0].questions_games[0].answered_count + 1})
        .eq('id', data[0].questions_games[0].id)
        .select()

        // cheeck if the count is equal to the amount of players in the game, if its equal change the state of the question isReady to true
        // if the state of isReady changes it should generate a new question_game field
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
