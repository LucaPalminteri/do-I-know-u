import type { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "@/utils/token";

import { player_game, questions_games } from "@/types/types";
import { getRandomCode, insertGame, insertPlayerGame, insertQuestionGame } from "@/utils/databaseFunctions";
import { QuestionGame } from "@/classes/QuestionGame";


export default async function createNewGame(req: NextApiRequest,res: NextApiResponse<Object | null>) {
    let code: string = getRandomCode();
    let username: string = String(req.query.username); 

    try {
        let game = await insertGame(code)

        if (game == null) return;

        let playerGame:player_game = await insertPlayerGame(game.id,username)
        let questionGame:questions_games = new QuestionGame(game.id,playerGame.place)

        await insertQuestionGame(questionGame)
        
        let serialized = createToken(username,code)
        res.setHeader("Set-Cookie", serialized);


        res.status(200).json(game.code);
    } catch (error) {
        res.status(500).json({ error });
    }
}