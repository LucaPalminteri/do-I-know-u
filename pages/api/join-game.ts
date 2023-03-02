import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/types";
import { createToken } from "@/utils/token";

const MAX_COUNT_PLAYERS = 7;

export default async function joinGame(
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) {

    // TODO: Verify if the player already has a token, if true redirect to the game, otherwise create token

    let { code, username } = req.body;



    if(req.headers.cookie == undefined) {
        let serialized = createToken(username,code)
        res.setHeader("Set-Cookie", serialized);
    }

    try {
        let { data, error } = await supabase
            .from("games")
            .select("*, players_games (*)")
            .eq("code", `${code}`);

        if (data == null) return;

        if (error) res.status(500).json(error);

        let usernames: Array<string> = data[0].players_games.map(
            (player: player_game): string => player.username
        );

        let isNameInUse: number = usernames.filter(
            (name: string): boolean => name == username
        ).length 

        let isUserInGame: boolean = usernames.some(
            (name: string): boolean => name == username
        );

        // if the user was in the game it can rejoin with the username
        if (isUserInGame) res.status(200).json(data);

        if (data?.length == 0) res.status(400).json(data);

        if (data[0].players_count >= MAX_COUNT_PLAYERS) {
            res
                .status(400)
                .json({
                    error: `El juego ya tiene la cantidad maxima de jugadores (${MAX_COUNT_PLAYERS})`,
                });
            return;
        }

        // add 1 to column 'players_count' in table games
        await supabase
            .from("games")
            .update({ players_count: data[0].players_count + 1 })
            .eq("code", `${code}`);

        // add username to with relationship with table game with code in table players_games
        await supabase
            .from("players_games")
            .insert({ game: data[0].id, username })
            .select();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
