'use client'

import React, { useEffect, useState } from 'react'
import supabase from '@/utils/supabase'
import { iQuestion } from '@/types/games'


function Insert() {

    const [question, setQuestion] = useState<iQuestion>({
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        option_5: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, option:number) => {
        if (option === 0) setQuestion(prev => ({...prev,question: e.target.value}));
        else if (option === 1) setQuestion(prev => ({...prev,option_1: e.target.value}));
        else if (option === 2) setQuestion(prev => ({...prev,option_2: e.target.value}));
        else if (option === 3) setQuestion(prev => ({...prev,option_3: e.target.value}));
        else if (option === 4) setQuestion(prev => ({...prev,option_4: e.target.value}));
        else if (option === 5) setQuestion(prev => ({...prev,option_5: e.target.value}));
        else return;
    }

    const insertData = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (question.question.trim() == '' ||
            question.option_1.trim() == '' ||
            question.option_2.trim() == '' ||
            question.option_3.trim() == '' ||
            question.option_4.trim() == '' ||
            question.option_5.trim() == ''
        ) {
            alert('Cannot send empty fields. Some fields are empty.')
            return;
        }
        try {
            const {data, error} = await supabase.from('questions').insert(question)
            if (error) return;
            setQuestion({
                question: '',
                option_1: '',
                option_2: '',
                option_3: '',
                option_4: '',
                option_5: '',
            })
        } catch (error) {
            alert(error)
        }
    };

  return (
    <div className='insert'>
        <form action="POST" className='form-insert'>
            <label style={{flexDirection: 'column'}}>Question</label>
            <input 
                type="text" 
                placeholder='Question...' 
                value={question.question}
                onChange={(e) => handleChange(e,0)}
            />
            <label>Option 1</label>
            <input 
                type="text" 
                placeholder='Option 1...' 
                value={question.option_1}
                onChange={(e) => handleChange(e,1)}
            />
            <label>Option 2</label>
            <input 
                type="text" 
                placeholder='Option 2...' 
                value={question.option_2}
                onChange={(e) => handleChange(e,2)}
            />
            <label>Option 3</label>
            <input 
                type="text" 
                placeholder='Option 3...' 
                value={question.option_3}
                onChange={(e) => handleChange(e,3)}
            />
            <label>Option 4</label>
            <input 
                type="text" 
                placeholder='Option 4...' 
                value={question.option_4}
                onChange={(e) => handleChange(e,4)}
            />
            <label>Option 5</label>
            <input 
                type="text" 
                placeholder='Option 5...' 
                value={question.option_5}
                onChange={(e) => handleChange(e,5)}
            />
            <button onClick={insertData}>insert</button>
        </form>
    </div>
  )
}

export default Insert