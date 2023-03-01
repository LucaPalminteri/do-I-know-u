'use client'
import React, { useEffect } from 'react'
import { question } from '@/types/games'
import AOS from "aos";
import "aos/dist/aos.css";

const AOS_DURATION:number = 500
const AOS_MAX_DELAY:number = 2800
const DELAY_BETWEEN:number = 100
const AOS_ANIMATION:string = "zoom-in-down"

function QuestionsClient({question}:{question:question}) {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    console.log(question);
  return (
    <main>
        <h2
            // data-aos={AOS_ANIMATION}
            // data-aos-duration={AOS_DURATION} 
            // data-aos-delay={AOS_MAX_DELAY}
        >{question.question}</h2>
        <section>
            <h3
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - DELAY_BETWEEN}
            >{question.option_1}</h3>
            <h3
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (2 * DELAY_BETWEEN)}
            >{question.option_2}</h3>
            <h3
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (3 * DELAY_BETWEEN)}
            >{question.option_3}</h3>
            <h3
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (4 * DELAY_BETWEEN)}
            >{question.option_4}</h3>
            <h3 
                // data-aos={AOS_ANIMATION} 
                // data-aos-duration={AOS_DURATION} 
                // data-aos-delay={AOS_MAX_DELAY - (5 * DELAY_BETWEEN)}
            >{question.option_5}</h3>
        </section>
    </main>
  )
}

export default QuestionsClient