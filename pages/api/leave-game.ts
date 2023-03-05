import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/types";
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

        let { data:players_count } = await supabase
            .from("games")
            .update({ players_count: data[0].players_count - 1 })
            .eq("code", `${code}`)
            .select();

        await supabase.from("players_questions").delete().eq("player", player[0].id);
        await supabase.from("players_games").delete().eq("id", player[0].id);

        if (players_count != null && data[0].players_count <= 1) {
            await supabase.from("questions_games").delete().eq("game_id", data[0].id);
            await supabase.from("games").delete().eq("id", data[0].id);
        }

        let serialized: string = deleteToken()
        res.setHeader("Set-Cookie", serialized);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
