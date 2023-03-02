import Link from 'next/link'
import JoinGame from '@/components/JoinGame'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import NewGameButton from '@/components/NewGameButton';
import React from 'react';

export default function Home() {

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
  }

  return (
    <main className='root'>
      <header>
        <h1>Te conozco?</h1>
      </header>

      <div className='option'>
        <NewGameButton/>
      </div>
      <div className='option'>
         <JoinGame playerCode={playerCode} hasCookie={hasCookie}/>
      </div>
      <div className='option info'>
        <Link href={'/information'}>
          <h2>¿Cómo se juega?</h2>
        </Link>
      </div>
    </main>
  )
}
