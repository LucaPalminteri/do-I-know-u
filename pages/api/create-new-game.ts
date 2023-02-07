import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { getRandomCode } from "@/utils/Functions";
import { createToken } from "@/utils/token";

export default async function createNewGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {
    let code: string = getRandomCode();
    let username: string = req.query.username;

    let serialized = createToken(username)
    res.setHeader("Set-Cookie", serialized);

    try {
        let { data, error } = await supabase
            .from("games")
            .insert({ code })
            .select();

        if (data == null || error) {
            res.status(500).json(error);
            return;
        }

        await supabase
            .from("players_games")
            .insert({ game: data[0].id, username })
            .select();

        res.status(200).json(data[0].code);
    } catch (error) {
        res.status(200).json({ data: "error" });
    }
}