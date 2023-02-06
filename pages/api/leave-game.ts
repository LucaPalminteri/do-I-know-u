import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'
import { player_game } from '@/types/games'

export default async function joinGame(
  req: NextApiRequest,
  res: NextApiResponse<Object | null>
) {

    let {code,username} = req.body

    try {
        let { data, error} = await supabase.from('games').select('*, players_games (*)').eq('code',`${code}`)

        if (data == null || error) {
            res.status(500).json(error)
            return;
        }

        if (data?.length == 0)
            res.status(400).json(data)
        
        let [player]:[player_game] = data[0].players_games.filter((player:player_game) => player.username == username)

        // subtract 1 to column 'players_count' in table games
        await supabase.from('games').update({players_count: data[0].players_count - 1}).eq('code',`${code}`)

        // delete username in table players_games
        await supabase.from('players_games').delete().eq('id',player.id)

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}