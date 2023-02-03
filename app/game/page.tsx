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
        <h3>Codigo: {code}</h3>
        <NewGameButton code={code}/>
    </div>
  )
}

export default Game