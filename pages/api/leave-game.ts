import type { NextApiRequest, NextApiResponse } from "next";
import { game_player_game, player_game } from "@/types/types";
import { deleteToken } from "@/utils/token";
import { deleteGame, deletePlayerGame, deletePlayerQuestion, deleteQuestionGame, getGame, updatePlayersCountInGame } from "@/utils/databaseFunctions";

export default async function joinGame(req: NextApiRequest, res: NextApiResponse<Object | null>) {
    let { code, username } = req.body;

    try {
        let game:game_player_game = await getGame(code)
            
        if (game == null) return;
        if (game == undefined) res.status(400).json(game);

        let [ playerID ] = game.players_games.map((player: player_game) => player.username == username ? player.id : '' );

        await updatePlayersCountInGame(game.players_count - 1, code)
        await deletePlayerQuestion(playerID)
        await deletePlayerGame(playerID)
        
        if (game.players_count <= 1) {
            await deleteQuestionGame(game.id)
            await deleteGame(game.id)
        }

        let serialized: string = deleteToken()
        res.setHeader("Set-Cookie", serialized);

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error });
    }
}