import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'

export default async function joinGame(
  req: NextApiRequest,
  res: NextApiResponse<Object | null>
) {

    let {data:code} = req.body

    try {
        const { data, error} = await supabase.from('games').select().eq('code',`${code}`)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ data: 'error' })
    }

}