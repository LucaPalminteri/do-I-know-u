'use client'
import React, { useState } from 'react'
import { player_game } from "@/types/types";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import supabase from '@/utils/supabase';    
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';

function UserList({players_games,username:player}:{players_games:Array<player_game>,username:string}) {
    const [players, setPlayers] = useState(players_games)

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'players_games' }, payload => {
        console.log(payload);
        
        if (payload.table == 'players_games') {
            if (payload.eventType == 'DELETE' || payload.eventType == 'UPDATE') {
                setPlayers(players_games)  
            }
            else {
                let newPlayer: any = payload.new
                setPlayers(prev => prev.concat(newPlayer))
            }
        }
    }).subscribe()


    let arrUsers = players.map(
        (username: player_game, index: number) => (
            <li key={index} style={username.username == player ? {color: 'lightgreen'} : {}}>
                <SentimentSatisfiedAltIcon />
                <p>{username.username}</p>
                {username.isReady == 1 ? 
                <CheckRoundedIcon style={{marginLeft: 'auto'}}/> :
                <HourglassEmptyRoundedIcon style={{marginLeft: 'auto'}}/>
                }
            </li>
        )
    );

  return (
    <>
        <h3>Participantes: {players.length} en total</h3>
        {arrUsers}
    </>
    )
    
}

export default UserList