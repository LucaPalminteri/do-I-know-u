import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/types";
import { createToken } from "@/utils/token";

const MAX_COUNT_PLAYERS = 7;

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

        if (error) res.status(500).json(error);
        
        if (data == null) return;
        if (data.length == 0) res.status(400).json(data);
        
        let [ game ] = data

        let usernames: Array<string> = game.players_games.map(
            (player: player_game): string => player.username
        );

        let isUserInGame: boolean = usernames.some(
            (name: string): boolean => name == username
        );

        if (isUserInGame) res.status(200).json(data);

        if (game.players_count >= MAX_COUNT_PLAYERS) {
            res
                .status(400)
                .json({
                    error: `El juego ya tiene la cantidad maxima de jugadores (${MAX_COUNT_PLAYERS})`,
                });
            return;
        }
        await supabase
            .from("games")
            .update({ players_count: game.players_count + 1 })
            .eq("code", `${code}`);

        let maxPlace:player_game = game.players_games.reduce( (max:player_game, obj:player_game):player_game => {
            return obj.place > max.place? obj : max;
          });

        await supabase
            .from("players_games")
            .insert({ game: game.id, username, place: maxPlace.place + 1 })

        if(req.headers.cookie == undefined) {
            let serialized = createToken(username,code)
            res.setHeader("Set-Cookie", serialized);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
