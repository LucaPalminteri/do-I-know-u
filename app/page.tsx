import Link from 'next/link'
import JoinGame from '@/components/JoinGame'

export default function Home() {
  return (
    <main className='root'>
      <header>
        <h1>Te conozco?</h1>
      </header>

      <div className='option'>
        <Link href={'/game'}>Nuevo juego</Link>
      </div>
      <div className='option'>
        <JoinGame/>
      </div>
      <div className='option'>
        <Link href={'/information'}>¿Cómo se juega?</Link>
      </div>
    </main>
  )
}
