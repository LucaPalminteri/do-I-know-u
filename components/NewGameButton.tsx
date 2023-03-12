'use client'

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from './Loader'
import AOS from "aos";
import "aos/dist/aos.css";

const AOS_DURATION:number = 600;

function NewGameButton() {

  let router = useRouter()

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [view, setView] = useState(false)

  
  async function startGame() {
    if (username.length < 4) {
      alert('El nombre no llega a la cantidad minima de caracteres')
      return;
    }

    setIsLoading(true)
    let {data} = await axios.get('/api/create-new-game',{params: {username}})
    router.push(`/game/${data}`)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  function toggleView() {
    setView(prev => !prev)
  }

  return (
    <div className='new-game'>
      <h2 className='option-main' onClick={toggleView}>Nuevo juego</h2>
      {isLoading && <Loader show={true} />}
      {view ? 
      <div  className={`new-game-input-container `}>
        <input 
          data-aos="fade-left"
          data-aos-duration={AOS_DURATION}
          type="text" 
          required
          value={username}
          onChange={handleChange}
          maxLength={30}
          placeholder={'Nombre...'}
         />
        <button
          data-aos="fade-right"
          data-aos-duration={AOS_DURATION}
          data-aos-delay={100}
          onClick={startGame} 
        >Iniciar</button>
      </div>
         : <></>} 
    </div>
  )
}

export default NewGameButton