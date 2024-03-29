import React, { use } from 'react'
import supabase from '@/src/utils/supabase'
import { game_player_game, player_game, question } from '@/src/types/types';
import QuestionsClient from './QuestionsClient';
import { getTokenInfo } from '@/src/utils/Functions';
import { getGame, getPlayers, getPlayerTurn, getQuestionsGames } from '@/src/utils/databaseFunctions';

async function getInfo() {
    try {
        const { data, error } = await supabase
            .from("questions_games")
            .select('*, questions (*)')
            .eq('isReady', false)

        if (data == null) return;

        return data[0].questions;
    } catch (error) {
        console.error(error);
        return {}
    }
}

async function Questions(): Promise<JSX.Element> {
    let { code, player } = getTokenInfo()

    let res = await getInfo()

    let game: game_player_game = await getGame(code)
    let players = game.players_games
    let playerTurnNumber: number = await getPlayerTurn(game.id)
    let playerTurn = players.find((player: player_game) => player.place == playerTurnNumber)

    return (
        <div className='questions'>
            <QuestionsClient question={res} code={code} player={player} playerTurn={playerTurn} />
        </div>
    )
}

export default Questions