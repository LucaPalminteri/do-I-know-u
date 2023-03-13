import type { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "@/utils/token";
import { questions_games } from "@/types/types";
import { getRandomCode, insertGame, insertPlayerGame, insertQuestionGame } from "@/utils/databaseFunctions";

export default async function createNewGame(req: NextApiRequest,res: NextApiResponse<Object | null>) {
    let code: string = getRandomCode();
    let username: string = String(req.query.username); 

    let serialized = createToken(username,code)
    res.setHeader("Set-Cookie", serialized);

    try {
        let game = await insertGame(code)

        let player_game = await insertPlayerGame(game.id, username)

        let questions_games:questions_games = {
            created_at: new Date(),
            question_id: Math.floor(Math.random() * 16) + 5,
            game_id: game.id,
            answered_count: 0,
            player_turn: player_game.data[0].id
        }

        await insertQuestionGame(questions_games)

        res.status(200).json(game.code);
    } catch (error) {
        res.status(500).json({ error });
    }
}