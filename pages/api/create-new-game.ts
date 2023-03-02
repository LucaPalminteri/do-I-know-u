import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { getRandomCode } from "@/utils/Functions";
import { createToken } from "@/utils/token";

import { questions_games } from "@/types/types";

export default async function createNewGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {
    let code: string = getRandomCode();
    let username: string = String(req.query.username); 

    let serialized = createToken(username,code)
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

        // crear relacion entre game y question para que todos los usuarios empiecen con la misma pregunta

        let questions_games:questions_games = {
            created_at: new Date(),
            question_id: Math.floor(Math.random() * 16) + 5,
            game_id: data[0].id
        }

        const qg = await supabase
            .from("questions_games")
            .insert(questions_games)
            .select()

            console.log("\n\n\n");
            console.log(qg);



        res.status(200).json(data[0].code);
    } catch (error) {
        res.status(200).json({ data: "error" });
    }
}