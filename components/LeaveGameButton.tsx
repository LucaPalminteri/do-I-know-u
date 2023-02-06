'use client'

import React from 'react'
import axios from 'axios'

function LeaveGameButton({code}:{code:string}) {

    async function handleClick() {
        let username = localStorage.getItem('username')

        let {data} = await axios.post('/api/leave-game',{code,username})

        console.log(data)
    }
  return (
    <button onClick={handleClick}>Abandonar partida</button>
  )
}

export default LeaveGameButton