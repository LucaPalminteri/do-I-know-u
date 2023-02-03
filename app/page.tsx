import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import JoinGame from '@/components/JoinGame'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <h1>te conozco</h1>

      <h2>
        <Link href={'/game'}>Nuevo juego</Link>
      </h2>
      <h2>
        <JoinGame/>
      </h2>
      <h2>
        <Link href={'/'}>¿Cómo se juega?</Link>
      </h2>
    </main>
  )
}
