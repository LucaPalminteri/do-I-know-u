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

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,question: e.target.value}));

    const handleChangeOption_1 = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,option_1: e.target.value}));

    const handleChangeOption_2 = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,option_2: e.target.value}));

    const handleChangeOption_3 = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,option_3: e.target.value}));

    const handleChangeOption_4 = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,option_4: e.target.value}));
    
    const handleChangeOption_5 = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(prev => ({...prev,option_5: e.target.value}));

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
                onChange={handleChangeQuestion}
            />
            <label>Option 1</label>
            <input 
                type="text" 
                placeholder='Option 1...' 
                value={question.option_1}
                onChange={handleChangeOption_1}
            />
            <label>Option 2</label>
            <input 
                type="text" 
                placeholder='Option 2...' 
                value={question.option_2}
                onChange={handleChangeOption_2}
            />
            <label>Option 3</label>
            <input 
                type="text" 
                placeholder='Option 3...' 
                value={question.option_3}
                onChange={handleChangeOption_3}
            />
            <label>Option 4</label>
            <input 
                type="text" 
                placeholder='Option 4...' 
                value={question.option_4}
                onChange={handleChangeOption_4}
            />
            <label>Option 5</label>
            <input 
                type="text" 
                placeholder='Option 5...' 
                value={question.option_5}
                onChange={handleChangeOption_5}
            />
            <button onClick={insertData}>insert</button>
        </form>
    </div>
  )
}

export default Insert