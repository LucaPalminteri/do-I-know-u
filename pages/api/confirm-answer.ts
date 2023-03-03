import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";

export default async function joinGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {

    let { option, code, player } = req.body

    // TODO: Add the answer to questions_games table
    try {
        let { data, error } = await supabase
            .from("games")
            .select("*, players_games (*)")

        if (data == null) return;

        if (error) res.status(500).json(error);
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
