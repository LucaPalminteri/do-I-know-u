import React, { use } from 'react'
import supabase from '@/src/utils/supabase'
import { getTokenInfo } from '@/src/utils/Functions';
import { PostgrestResponse, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { game, player_game } from '@/src/types/types';
import ConfirmGameButton from './ConfirmGameButton';
import PlayersReady from './PlayersReady';

async function getInfo() {
    let { code } = getTokenInfo()

    try {

        let game_id: PostgrestResponse<game> = await supabase
            .from('games')
            .select()
            .eq('code', code)

        if (game_id.data == null) return
        let [game] = game_id.data

        let players: PostgrestResponse<player_game> = await supabase
            .from("players_games")
            .select()
            .eq('game', game.id)

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

    return (
        <div className='wait-confirmation'>
            <PlayersReady players={data?.players} />
            <ConfirmGameButton username={player} gameId={data?.game_id} />
        </div>
    )
}

export default WaitConfirmation