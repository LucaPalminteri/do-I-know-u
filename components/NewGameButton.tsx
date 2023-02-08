'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from './Loader'

function NewGameButton() {

  let router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  
  async function startGame() {
    if (username.length < 4) return;

    setIsLoading(true)
    let {data} = await axios.get('/api/create-new-game',{params: {username}})
    localStorage.setItem('username',username)
    router.push(`/game/${data}`)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className='new-game'>
      {isLoading && <Loader show={true} />}
        <label htmlFor="">Nombre:</label>
        <input 
         type="text" 
         required
         value={username}
         onChange={handleChange}
         maxLength={30}
        />
        <button
        onClick={startGame}
        >Iniciar</button>
    </div>
  )
}

export default NewGameButton