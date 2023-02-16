import React, {use} from 'react'
import supabase from '@/utils/supabase'
import { question } from '@/types/games';
import QuestionsClient from './QuestionsClient';

async function getInfo() {
    try {
        const { data, count, error } = await supabase
            .from("questions")
            .select('*',{ count: 'exact' })
        
        if (data == null || count == null) return;

        let index = Math.floor(Math.random() * count)
        
        return data[index];
    } catch (error) { }
}

function Questions() {

    let res: question = use(getInfo());
  return (
    <div className='questions'>
        <QuestionsClient question={res}/>
    </div>
  )
}

export default Questions