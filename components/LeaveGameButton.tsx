'use client'
import LogoutIcon from '@mui/icons-material/Logout';

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function LeaveGameButton({code,username}:{code:string,username: string}) {

    let route = useRouter()

    async function handleClick() {
      console.log("prev");
      console.log({code,username});
        await axios.post('/api/leave-game',{code,username})
        route.push('/')
    }
  return (
    <button onClick={handleClick}><LogoutIcon style={{marginRight: 10}}/>Abandonar partida</button>
  )
}

export default LeaveGameButton