import React, {use} from 'react'
import supabase from '@/utils/supabase'
import { question } from '@/types/types';
import QuestionsClient from './QuestionsClient';
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";

async function getInfo() {

    const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

  let hasCookie: boolean = cookie != undefined

  let playerUsername = "", playerCode = ''

  if (hasCookie) {
    let token:any = jwt.verify(
        String(cookie?.value),
        String(process.env.NEXT_PUBLIC_TOKEN_NAME)
    );

    playerCode = token.code
    playerUsername = token.username
  }
  
    try {
        const { data, error } = await supabase
            .from("questions_games")
            .select('*, questions (*)')

            
            if (data == null) return;
        
        return data[0].questions;
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