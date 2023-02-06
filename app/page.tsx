import Link from 'next/link'
import JoinGame from '@/components/JoinGame'

export default function Home() {
  return (
    <main>
      <header>
        <h1>Te conozco?</h1>
      </header>

      <h2>
        <Link href={'/game'}>Nuevo juego</Link>
      </h2>
      <h2>
        <JoinGame/>
      </h2>
      <h2>
        <Link href={'/information'}>¿Cómo se juega?</Link>
      </h2>
    </main>
  )
}
