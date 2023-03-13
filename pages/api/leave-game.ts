import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/types";
import { deleteToken } from "@/utils/token";
import { deleteGame, deletePlayerGame, deletePlayerQuestion, deleteQuestionGame } from "@/utils/databaseFunctions";

export default async function joinGame(req: NextApiRequest,res: NextApiResponse<Object | null>) {
    let { code, username } = req.body;

    try {
        let { data, error } = await supabase
            .from("games")
            .select("*, players_games (*)")
            .eq("code", `${code}`);
            
        if (error) res.status(500).json(error);
        if (data == null) return;
        if (data?.length == 0) res.status(400).json(data);

        let [ game ] = data

        let player = game.players_games.filter((player: player_game) => player.username == username);

        let { data:players_count } = await supabase
            .from("games")
            .update({ players_count: game.players_count - 1 })
            .eq("code", `${code}`)
            .select();

        await deletePlayerQuestion(player[0].id)
        await deletePlayerGame(player[0].id)

        let noPlayersLeft = players_count != null && game.players_count <= 1
        
        if (noPlayersLeft) {
            await deleteQuestionGame(game.id)
            await deleteGame(game.id)
        }

        let serialized: string = deleteToken()
        res.setHeader("Set-Cookie", serialized);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}