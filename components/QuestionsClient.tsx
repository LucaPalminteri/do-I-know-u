'use client'
import React, { useEffect, useState } from 'react'
import { question } from '@/types/types'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';

const AOS_DURATION:number = 500
const AOS_MAX_DELAY:number = 2800
const DELAY_BETWEEN:number = 100
const AOS_ANIMATION:string = "zoom-in-down"

function QuestionsClient({question,code,player}:{question:question,code:string,player:string}) {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

      const [selected, setSelScted] = useState(0)

    const handleAnswer = async (value: string | null, option:number) => {

        let {data} = await axios.post('/api/confirm-answer', {option,code,player});

        console.log(data);

        if (option === 1) setSelScted(1)
        else if (option === 2) setSelScted(2)
        else if (option === 3) setSelScted(3)
        else if (option === 4) setSelScted(4)
        else if (option === 5) setSelScted(5)
        else return;
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