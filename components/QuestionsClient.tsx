'use client'
import React, { useEffect, useState } from 'react'
import { question } from '@/types/types'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { getTokenInfo } from '@/utils/Functions';

const AOS_DURATION:number = 500
const AOS_MAX_DELAY:number = 2800
const DELAY_BETWEEN:number = 100
const AOS_ANIMATION:string = "zoom-in-down"

function QuestionsClient({question,code,player}:{question:question,code:string,player:string}) {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

      const [selected, setSelScted] = useState(false)

    const handleAnswer = async (value: string | null, option:number) => {

        let { data } = await axios.post('/api/confirm-answer', {option,code,player});
        console.log(data);

        if (option === 1) setSelScted(true)
        else if (option === 2) console.log(value)
        else if (option === 3) console.log(value)
        else if (option === 4) console.log(value)
        else if (option === 5) console.log(value)
        else return;
    }
  return (
    <main>
        <h2
            // data-aos={AOS_ANIMATION}
            // data-aos-duration={AOS_DURATION} 
            // data-aos-delay={AOS_MAX_DELAY}
        >{question.question}</h2>
        <section>
            <button
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - DELAY_BETWEEN}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,1)}
            >{question.option_1}</button>
            <button
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (2 * DELAY_BETWEEN)}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,2)}
            >{question.option_2}</button>
            <button
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (3 * DELAY_BETWEEN)}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,3)}
            >{question.option_3}</button>
            <button
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (4 * DELAY_BETWEEN)}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,4)}
            >{question.option_4}</button>
            <button 
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (5 * DELAY_BETWEEN)}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAnswer(e.currentTarget.textContent,5)}
            >{question.option_5}</button>
        </section>
    </main>
  )
}

export default QuestionsClient