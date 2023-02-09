'use client'

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function LeaveGameButton({code,username}:{code:string,username: string}) {

    let route = useRouter()

    async function handleClick() {

        await axios.post('/api/leave-game',{code,username})
        route.push('/')
    }
  return (
    <button onClick={handleClick}>Abandonar partida</button>
  )
}

export default LeaveGameButton