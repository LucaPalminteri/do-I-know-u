import Link from 'next/link'
import JoinGame from '@/components/JoinGame'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Home() {

  const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

  let hasCookie: boolean = cookie != undefined

  let playerUsername = "", playerCode = ''

  if (hasCookie) {
    let { username, code } = jwt.verify(
        cookie?.value,
        process.env.NEXT_PUBLIC_TOKEN_NAME
    );

    playerCode = code
  }

  return (
    <main className='root'>
      <header>
        <h1>Te conozco?</h1>
      </header>

      <div className='option'>
        <Link href={'/game'}>Nuevo juego</Link>
      </div>
      <div className='option'>
        { hasCookie ? <Link href={`/game/${playerCode}`}>Continuar juego</Link> : <JoinGame/>}
      </div>
      <div className='option'>
        <Link href={'/information'}>¿Cómo se juega?</Link>
      </div>
    </main>
  )
}
