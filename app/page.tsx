import Link from 'next/link'
import JoinGame from '@/components/JoinGame'

export default function Home() {
  return (
    <main>
      <h1>te conozco</h1>

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
