'use client'
import React, { useState } from 'react'
import supabase from '@/src/utils/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { player_game, model_player_game } from '@/src/types/types';
import { CircularProgress } from '@mui/material';
import Router from "next/router";

function ConfirmGameButton({ gameId, username }: { gameId: string | undefined, username: string }) {
    
    const [isReady, setIsReady] = useState(false)

    const handleReady = async () => {
        try {

            let game: PostgrestResponse<model_player_game> = await supabase
                .from('players_games')
                .update({ isReady: true })
                .eq('game', gameId)
                .eq('username', username)
                .select('*, games (*)')

            let players: PostgrestResponse<player_game> = await supabase
                .from('players_games')
                .select()
                .eq('game', gameId)
                .eq('isReady', true)

            await supabase
                .from('games')
                .update({player_ready: game.data != null ? game.data[0].games.player_ready + 1 : 0})
                .eq('code', game.data != null ? game.data[0].games.code : '')

            if (game.data == null || players.data == null) return;

            let ready_players: number = players.data.length
            let total_players: number = game.data[0].games.players_count

            if (ready_players == total_players) {
                //start the game
                await supabase
                    .from('games')
                    .update({ hasStarted: true })
                    .eq('id', gameId)
            }

            setIsReady(true)
            Router.reload();

        } catch (error) {
            console.error(error);
            return {}
        }
    }
    return (
        <>
            {
                isReady ?
                    <>
                        <h2>Esperando jugadores</h2>
                        <CircularProgress />
                    </> :
                    <button
                        onClick={handleReady}
                    >Estoy listo</button>
            }
        </>
    )
}

export default ConfirmGameButton