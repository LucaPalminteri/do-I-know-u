'use client'
import React, { useState } from 'react'
import { player_game } from "@/types/games";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import supabase from '@/utils/supabase';    

function UserList({players_games,username}:{players_games:Array<player_game>,username:string}) {
    const [players, setPlayers] = useState(players_games)
    const [player, setPlayer] = useState(username)
    const [playerID, setPlayerID] = useState('')

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'players_games' }, payload => {
        
        if (payload.table == 'players_games') {
            console.log(payload);
            if (payload.eventType == 'DELETE') {
                let newPlayers = players.filter(newPlayer => newPlayer.username != player)
                console.log(newPlayers);
                setPlayers(newPlayers)  
            }
            else {
                setPlayers(prev => prev.concat(payload.new))
            }
        }
    }).subscribe()

    let isUserStyle = {
        marginRight:10,
        color: 'lightgreen'
    }

    let arrUsers = players.map(
        (username: player_game, index: number) => (
            <li key={index} style={username.username == player ? isUserStyle : {}}><SentimentSatisfiedAltIcon style={username.username == player ? isUserStyle : {marginRight:10}}/>{username.username}</li>
        )
    );

  return <>{arrUsers}</>
    
}

export default UserList