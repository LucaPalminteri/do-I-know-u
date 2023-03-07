import React, { use } from 'react'
import supabase from '@/utils/supabase'
import { getTokenInfo } from '@/utils/Functions';
import { PostgrestResponse, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { game, player_game } from '@/types/types';
import ConfirmGameButton from './ConfirmGameButton';

async function getInfo() {  
    let { code } = getTokenInfo()
    
    try {

        let game_id: PostgrestResponse<game> = await supabase
            .from('games')
            .select()
            .eq('code',code)

            if (game_id.data == null) return
            let [ game ] = game_id.data

        let players: PostgrestResponse<player_game> = await supabase
            .from("players_games")
            .select()
            .eq('game',game.id)

        if (players.data == null) return;
        
        return {
            players: players.data,
            game_id: game.id
        };
    } catch (error) { 
        console.error(error);
        return {}
    }
}

function WaitConfirmation() {

    let { player } = getTokenInfo()

    let data = use(getInfo())
    let total_players:number = 0;
    let ready_players:number = 0;

    if (data != undefined && Array.isArray(data.players)) {
        total_players = data.players.length
        ready_players = data.players.filter( (player:player_game) => player.isReady == true).length
    }

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'players_games' }, async (payload:RealtimePostgresChangesPayload<player_game>) => {
         console.log(payload.new);
         ready_players++
    }).subscribe()

  return (
    <div>
        <h2>{ready_players}/{total_players} jugadores listos</h2>
        <ConfirmGameButton username={player} gameId={data?.game_id}/>
    </div>
  )
}

export default WaitConfirmation