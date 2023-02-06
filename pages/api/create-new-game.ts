import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'
import { getRandomCode } from '@/utils/Functions'
import { game,player_game } from '@/types/games'

export default async function createNewGame(
  req: NextApiRequest,
  res: NextApiResponse<Object | null>
) {

  let code:string = getRandomCode()
  let username:string | string[] | undefined =  req.query.username
  let game:game | undefined = undefined
  let player_game:player_game | undefined = undefined
  
  try {
    let games_response = await supabase.from('games').insert({code}).select()

    if (games_response.data == null) return;

    if (games_response != null) 
      game = games_response.data[0]
    
    let players_games_response = await supabase.from('players_games').insert({game:game?.id,username}).select()

    if (players_games_response != null) 
      player_game = players_games_response.data[0]
    

    res.status(200).json(game.code)
  } catch (error) {
    res.status(200).json({ data: 'error' })
  }
}