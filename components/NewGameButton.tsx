'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function NewGameButton({code}:{code:string}) {

  let router = useRouter()

  function startGame() {
    router.push(`/game/${code}`)
  }

  return (
    <button
    onClick={startGame}
    >Iniciar</button>
  )
}

export default NewGameButton