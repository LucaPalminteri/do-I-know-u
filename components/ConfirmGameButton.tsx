'use client'
import React from 'react'
import supabase from '@/utils/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { player_game } from '@/types/types';
function ConfirmGameButton({gameId,username}:{gameId:string|undefined,username:string}) {

    const handleReady = async () => {
        try {

            let res:PostgrestResponse<player_game> = await supabase
                .from('players_games')
                .update({isReady: true})
                .eq('game',gameId)
                .eq('username',username)
                .select('*, games (*)')

            let players = await supabase
                    .from('players_games')
                    .select()
                    .eq('game',gameId)
                    .eq('isReady',true)

            
                    // TODO: IF players ready count == players count in game THEN start the game
                
    
        } catch (error) { 
            console.error(error);
            return {}
        }
    }
  return (
    <button
        onClick={handleReady}
    >Estoy listo</button>
  )
}

export default ConfirmGameButton