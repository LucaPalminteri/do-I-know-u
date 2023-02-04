'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from './Loader'

function NewGameButton() {

  let router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  
  async function startGame() {
    setIsLoading(true)
    let {data} = await axios.get('/api/create-new-game')
    router.push(`/game/${data}`)
  }

  return (
    <>
      {isLoading && <Loader show={true} />}
      <button
      onClick={startGame}
      >Iniciar</button>
    </>
  )
}

export default NewGameButton