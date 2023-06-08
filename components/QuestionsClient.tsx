'use client'
import React, { useEffect, useState } from 'react'
import { game, game_player_game, player_game, player_question, question, questions_games } from '@/types/types'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import supabase from '@/utils/supabase';
import { CircularProgress } from '@mui/material';
import { useRouter } from "next/navigation";
import { getGame, getLastPlayersQuestions, getPlayersQuestions, getPlayersQuestionsByQuestion, updatePlayerPoints } from '@/utils/databaseFunctions';


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
            async (payload: any) => {
                let question_game: questions_games = payload.new

                if (question_game.answered_count == game?.players_count && question_game.isReady)
                {
                    await calculateResults(playerTurn, game);
                    setHasAnswered(false)
                    router.push(`/game/${code}/result`);
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

async function calculateResults(playerTurn: player_game | undefined, game: game_player_game | game | undefined)
{
    // I need to know what player is in turn

    // With that player I need to know the option selected

    let playerQuestion:player_question  = await getLastPlayersQuestions(playerTurn?.id ?? '')
    let option = playerQuestion.option
    let pointsPlayerTurn = 0

    // Then I need to add 1 for each same response
    // game?.players_games.forEach((x)=>{
    //     console.log("player:")
    //     console.log(x)
    // })


    let playersQuestions:Array<player_question> = await getPlayersQuestionsByQuestion(playerQuestion.question)

    playersQuestions.forEach(async (playerQuestion) => {
        if (playerQuestion.id == playerQuestion.id) {
            return
        }

        if (playerQuestion.option == option) {
            pointsPlayerTurn++
            await updatePlayerPoints(playerQuestion.player)
        }
    })
    // eg: 
    /*
        turn: player1
        players: player1, player2, player3, player4, player5 
        option player in turn: 4
        options:
            player2: 2
            player3: 4
            player4: 5
            player5: 4

        RESULTS

        player1: 2
        player2: 0
        player3: 1
        player4: 0
        player5: 1
    */   
}
