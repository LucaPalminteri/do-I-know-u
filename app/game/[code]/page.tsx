import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import React, { use } from 'react'
import ShareButton from '@/components/ShareButton'
import supabase from '@/utils/supabase'
import { game, player_game } from '@/types/games'

async function getInfo(code:string) {
  try {
    const { data, error } = await supabase.from('games').select(`*, players_games (*)`)
    return data[0]
  } catch (error) {

  }
}


function Code({params}:{params:Params}) {

    let code:string = params.code

    let res = use(getInfo(code))

    let arrUsers = res.players_games.map((username:player_game,index:number) => <li key={index}>{username.username}</li>)

  return (
    <div>
      <Link href={'/'}>Inicio</Link>
      
      <h3>Participantes: {res.players_count} en total</h3>
      <ol>
        {arrUsers}
      </ol>

      {res.players_count >= 3 && <button>Empezar</button>}

      <h3>code ==== {code}</h3> 
      <ShareButton code={code}/>
    </div>
  )
}

export default Code