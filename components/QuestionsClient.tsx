'use client'
import React, { useEffect, useState } from 'react'
import { game, player_game, question, questions_games } from '@/types/types'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import supabase from '@/utils/supabase';
import { CircularProgress } from '@mui/material';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";
import { getGame } from '@/utils/databaseFunctions';


function QuestionsClient({question,code,player,playerTurn}:{question:question,code:string,player:string,playerTurn:player_game | undefined}) {
    const router = useRouter();

    const [hasAnswered, setHasAnswered] = useState(false)
    const [game, setGame] = useState<game>()

    useEffect(() => {
        AOS.init();
        AOS.refresh();

        async function setCurrentGame() {
            setGame(await getGame(code))
        }

        setCurrentGame()

      }, []);

    const handleAnswer = async (value: string | null, option:number) => {
        let {status,data} = await axios.post('/api/confirm-answer', {option,code,player});
        if(status == 208) {
            alert(data.message)
        }

        if (status == 200) {
            setHasAnswered(true)
        }
    }

    supabase
        .channel('*')
        .on(
            'postgres_changes', 
            { 
                event: '*', 
                schema: '*', 
                table: 'questions_games' 
            }, 
            async (payload: RealtimePostgresChangesPayload<questions_games>) => {
                let question_game:questions_games = payload.new

                console.log({answ:question_game.answered_count,coun:game?.players_count});
                if (question_game.answered_count == game?.players_count)
                {
                    setHasAnswered(true)
                    router.replace(`/game/${code}`);
                }
                else {
                    console.log({else: question_game});
                    setHasAnswered(false)
                }
            }
        )
        .subscribe()

  return (
    <main>
        <h3 className='player-turn'>{playerTurn?.username}</h3>
        <h2
        >{question.question}</h2>
        {
            hasAnswered ? 
            <>
                <h3>Esperando Jugadores</h3>
                <CircularProgress />
            </>
            :
            <section>
            <button 
                className='btn-option'
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,1)}
            >{question.option_1}</button>
            <button
                className='btn-option'
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,2)}
            >{question.option_2}</button>
            <button
                className='btn-option'
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,3)}
            >{question.option_3}</button>
            <button
                className='btn-option'
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,4)}
            >{question.option_4}</button>
            <button 
                className='btn-option'
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,5)}
            >{question.option_5}</button>
        </section>
        }
        
    </main>
  )
}

export default QuestionsClient