'use client'

import React, { useEffect, useState } from 'react'
import supabase from '@/utils/supabase';
import { game, player_game } from '@/types/types';
import { RealtimeClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

function PlayersReady({ players }: { players: Array<player_game> | undefined }) {

    const [totalPlayers, setTotalPlayers] = useState(0)
    const [readyPlayers, setReadyPlayers] = useState(0)
    const router = useRouter();

    useEffect(() => {
        
        if (players != undefined && Array.isArray(players)) {
            setTotalPlayers(players.length)
            setReadyPlayers(players.filter((player: player_game) => player.isReady == true).length)
        }

    }, [])

    supabase
        .channel('*')
        .on(
            'postgres_changes', 
            { 
                event: '*', 
                schema: '*', 
                table: 'games' 
            }, 
            async (payload: RealtimePostgresChangesPayload<game>) => {
                let game:game = payload.new
                setTotalPlayers(game.players_count)
                setReadyPlayers(game.player_ready)

                if (game.players_count >= 1 && game.players_count == game.player_ready)
                {
                    router.replace(`/game/${game.code}`);
                }
            }
        )
        .subscribe()

    return (
        <h2>{readyPlayers}/{totalPlayers} jugadores listos</h2>
    )
}

export default PlayersReady