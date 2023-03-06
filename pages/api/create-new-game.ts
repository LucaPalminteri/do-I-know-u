import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
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

        let [ game ] = data

        await supabase
            .from("players_games")
            .insert({ game: game.id, username,place:1 })
            .select();

        let questions_games:questions_games = {
            created_at: new Date(),
            question_id: Math.floor(Math.random() * 16) + 5,
            game_id: game.id
        }

        const qg = await supabase
            .from("questions_games")
            .insert(questions_games)
            .select()

        res.status(200).json(game.code);
    } catch (error) {
        res.status(200).json({ data: "error" });
    }
}

export function getRandomCode():string 
{
    let code:string = ""
    let charASCII:number = 0

    for (let i = 0; i < 6; i++) 
    {
        charASCII = Math.floor(Math.random() * 25) + 65
        code += String.fromCharCode(charASCII)
    }

    return code
}