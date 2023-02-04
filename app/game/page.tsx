import Link from 'next/link'
import React from 'react'
import NewGameButton from '@/components/NewGameButton'

import { getRandomCode } from '@/utils/Functions'

function Game() 
{
  let code = getRandomCode()

  return (
    <div>
        <Link href={'/'}>Volver</Link>
        <h1>Te Conozco</h1>
        <NewGameButton />
        <h2>Some basic info about the game</h2>
    </div>
  )
}

export default Game