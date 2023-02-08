import Link from 'next/link'
import React from 'react'
import NewGameButton from '@/components/NewGameButton'

function Game() 
{

  return (
    <div className='game'>
      <header>
        <Link href={'/'}>Volver</Link>
      </header>
        <h1>Te Conozco</h1>
        <NewGameButton />
        <h2>Some basic info about the game</h2>
    </div>
  )
}

export default Game