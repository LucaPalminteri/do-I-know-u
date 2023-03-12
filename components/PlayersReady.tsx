'use client'

import React, { useEffect, useState } from 'react'
import supabase from '@/utils/supabase';
import { player_game } from '@/types/types';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

function PlayersReady({players}:{players: Array<player_game> | undefined}) {

    const [totalPlayers, setTotalPlayers] = useState(0)
    const [readyPlayers, setReadyPlayers] = useState(0)

    useEffect(() => {
      
        if (players != undefined && Array.isArray(players)) {
            setTotalPlayers(players.length)
            setReadyPlayers(players.filter( (player:player_game) => player.isReady == true).length)
        }
    
    }, [])

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'players_games' }, async (payload:RealtimePostgresChangesPayload<player_game>) => {
         setReadyPlayers(prev => prev + 1)
    }).subscribe()


  return (
    <h2>{readyPlayers}/{totalPlayers} jugadores listos</h2>
  )
}

export default PlayersReady