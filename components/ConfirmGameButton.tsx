'use client'
import React from 'react'
import supabase from '@/utils/supabase';
function ConfirmGameButton({gameId,username}:{gameId:string|undefined,username:string}) {

    const handleReady = async () => {
        try {

            let res = await supabase
                .from('players_games')
                .update({isReady: true})
                .eq('game',gameId)
                .eq('username',username)
                .select()

                console.log(res);
    
                //if (game_id.data == null) return
            
                //let [ game ] = game_id.data
    
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