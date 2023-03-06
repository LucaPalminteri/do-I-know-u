import React, {use} from 'react'
import supabase from '@/utils/supabase'
import { question } from '@/types/types';
import QuestionsClient from './QuestionsClient';
import { getTokenInfo } from '@/utils/Functions';

async function getInfo() {  
    try {
        const { data, error } = await supabase
            .from("questions_games")
            .select('*, questions (*)')
            .eq('isReady',false)

        if (data == null) return;
        let [questions_games] = data
        
        return questions_games.questions;
    } catch (error) { }
}

function Questions() {
    let {code, player} = getTokenInfo()

    let res: question = use(getInfo());
  return (
    <div className='questions'>
        <QuestionsClient question={res} code={code} player={player}/>
    </div>
  )
}

export default Questions