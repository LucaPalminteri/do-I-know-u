import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/games";
import { deleteToken } from "@/utils/token";

export default async function joinGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {
    let { code, username } = req.body;

    try {
        let { data, error } = await supabase
            .from("games")
            .select("*, players_games (*)")
            .eq("code", `${code}`);
            
        if (data == null || error) {
            res.status(500).json(error);
            return;
        }

        if (data?.length == 0) res.status(400).json(data);

        let player = data[0].players_games.filter((player: player_game) => player.username == username);

        // subtract 1 to column 'players_count' in table games
        let { data:players_count } = await supabase
            .from("games")
            .update({ players_count: data[0].players_count - 1 })
            .eq("code", `${code}`)
            .select();

        // delete username in table players_games
        await supabase.from("players_games").delete().eq("id", player[0].id);

        // if theres no players left in the game, the game should also be deleted
        if (players_count != null && data[0].players_count <= 1) {
            let res = await supabase.from("games").delete().eq("id", data[0].id).select();
            console.log(res);
        }

        let serialized: string = deleteToken()
        res.setHeader("Set-Cookie", serialized);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
