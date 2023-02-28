'use client'

import React, { useEffect, useState } from 'react'


function Insert() {

    const [question, setQuestion] = useState('')
    const [option_1, setOption_1] = useState('')
    const [option_2, setOption_2] = useState('')
    const [option_3, setOption_3] = useState('')
    const [option_4, setOption_4] = useState('')


    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleChangeOption_1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption_1(e.target.value);
    };

    const handleChangeOption_2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption_2(e.target.value);
    };

    const handleChangeOption_3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption_3(e.target.value);
    };

    const handleChangeOption_4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption_4(e.target.value);
    };

  return (
    <div className='insert'>
        <form action="POST" className='form-insert'>
            <label style={{flexDirection: 'column'}}>Question</label>
            <input 
                type="text" 
                placeholder='Question...' 
                value={question}
                onChange={handleChangeQuestion}
            />
            <label>Option 1</label>
            <input 
                type="text" 
                placeholder='Option 1...' 
                value={question}
                onChange={handleChangeOption_1}
            />
            <label>Option 2</label>
            <input 
                type="text" 
                placeholder='Option 2...' 
                value={question}
                onChange={handleChangeOption_2}
            />
            <label>Option 3</label>
            <input 
                type="text" 
                placeholder='Option 3...' 
                value={question}
                onChange={handleChangeOption_3}
            />
            <label>Option 4</label>
            <input 
                type="text" 
                placeholder='Option 4...' 
                value={question}
                onChange={handleChangeOption_4}
            />
            <button>insert</button>
        </form>
    </div>
  )
}

export default Insert