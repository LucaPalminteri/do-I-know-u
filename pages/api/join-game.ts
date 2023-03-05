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

        console.log();

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
        await supabase
            .from("games")
            .update({ players_count: data[0].players_count + 1 })
            .eq("code", `${code}`);

        let maxPlace:number = data[0].players_games.reduce( (max:player_game, obj:player_game):number => {
            return obj.place > max.place? obj.place : max.place;
          });

        await supabase
            .from("players_games")
            .insert({ game: data[0].id, username, place: maxPlace + 1 })
            .select();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
