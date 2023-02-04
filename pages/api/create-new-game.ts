import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'
import { getRandomCode } from '@/utils/Functions'
import { game } from '@/types/games'
import { PostgrestResponse } from '@supabase/supabase-js'

export default async function createNewGame(
  req: NextApiRequest,
  res: NextApiResponse<Object | null>
) {

  let code:string = getRandomCode()
  
  try {
    const { data, error} = await supabase.from('games').insert({code}).select()
    res.status(200).json(data[0].code)
  } catch (error) {
    res.status(200).json({ data: 'error' })
  }
}