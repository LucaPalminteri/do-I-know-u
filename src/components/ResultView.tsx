'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, usePathname  } from 'next/navigation';
import { game } from '@/src/types/types';
import { getGame, getPlayersGames } from '@/src/utils/databaseFunctions';
import Link from 'next/link';
import { GameQuestionGame } from '../classes/GameQuestionGame';

function ResultView() {

  let [code, setCode] = useState<string>(usePathname()?.split('/')[2] ?? '')
  let [game, setGame] = useState<game>()
  let [playerQuestion, setPlayerQuestion] = useState<GameQuestionGame | null>()
  
  useEffect(() => {
    async function getGameAsync(code:string) {
      setGame(await getGame(code))
      setPlayerQuestion(await getPlayersGames(code))
    }
    getGameAsync(code)
  }, [])

  console.log(playerQuestion)
  
  
  return (
    <div>
      <h1>ResultView</h1>
      <h2>code: {code}</h2>

      <h2>game_id: {game?.id ?? 'loading...'}</h2>
      <p>created_at: {game?.created_at ?? 'loading...'}</p>
      <p>player_ready: {game?.player_ready ?? 'loading...'}</p>
      <p>players_count: {game?.players_count ?? 'loading...'}</p>
      <p>hasStarted: {game?.hasStarted ?? 'loading...'}</p>

      <button>ready</button>

      <button>
        <Link href={`/game/${code}`}>Next</Link>
      </button>
    </div>
  )
}

export default ResultView