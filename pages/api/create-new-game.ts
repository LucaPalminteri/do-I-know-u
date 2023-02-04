import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'
import { getRandomCode } from '@/utils/Functions'

export default async function createNewGame(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {

  let code:string = getRandomCode()
  
  try {
    const { data, error} = await supabase.from('games').insert({code})
    res.status(200).json({data:'ok'})
  } catch (error) {
    res.status(200).json({ data: 'error' })
  }
    res.status(200).json(req.body)
}