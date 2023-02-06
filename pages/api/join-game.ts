import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'

const MAX_COUNT_PLAYERS = 7

export default async function joinGame(
  req: NextApiRequest,
  res: NextApiResponse<Object | null>
) {

    let {code,username} = req.body

    try {
        let { data, error} = await supabase.from('games').select().eq('code',`${code}`)

        if (data?.length > 0) {
            if (data[0].players_count >= MAX_COUNT_PLAYERS) {
                res.status(200).json({error: `El juego ya tiene la cantidad maxima de jugadores (${MAX_COUNT_PLAYERS})`})
                return
            }
        }

        // add 1 to column 'players_count' in table games
        let games_update = await supabase.from('games').update({players_count: data[0].players_count + 1}).eq('code',`${code}`)

        // add username to with relationship with table game with code in table players_games

        let players_games_response = await supabase.from('players_games').insert({game:data[0].id,username}).select()





        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ data: 'error' })
    }

}