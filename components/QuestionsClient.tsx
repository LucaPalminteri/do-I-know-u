'use client'
import React, { useEffect, useState } from 'react'
import { question } from '@/types/types'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import supabase from '@/utils/supabase';

function QuestionsClient({question,code,player}:{question:question,code:string,player:string}) {

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'questions_games' }, async (payload) => {
        console.log(payload);
    }).subscribe()

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    const handleAnswer = async (value: string | null, option:number) => {
        let {data} = await axios.post('/api/confirm-answer', {option,code,player});
    }
  return (
    <main>
        <h2
        >{question.question}</h2>
        <section>
            <button
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,1)}
            >{question.option_1}</button>
            <button
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,2)}
            >{question.option_2}</button>
            <button
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,3)}
            >{question.option_3}</button>
            <button
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,4)}
            >{question.option_4}</button>
            <button 
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,5)}
            >{question.option_5}</button>
        </section>
    </main>
  )
}

export default QuestionsClient