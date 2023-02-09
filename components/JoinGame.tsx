'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import axios from 'axios';
import PopUp from './PopUpMessage';
import Loader from './Loader';
import Link from 'next/link';
import Cookies from 'js-cookie'

export default function JoinGame() {

    let cookies = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!)

    console.log(cookies);
    const [code, setCode] = useState('');

    const [showPopUp, setShowPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    const closePopUp = () => {
        setShowPopUp(false);
    };

    const router = useRouter()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newCode = e.target.value.toUpperCase()
        if (newCode.match(/^[A-Z]+$/) || newCode == "") {
            setCode(newCode);
        }
    };

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      };

    const handleClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        // Valido que tenga minimo 6 caracteres
        if (code.length < 6) {
            setMessage('El código debe tener 6 letras')
            setShowPopUp(true)
            return;
        }

        if (username.length < 3) {
            setMessage('El nombre debe tener al menos 3 letras')
            setShowPopUp(true)
            return;
        }
        setIsLoading(true)

        // Mando peticion al backend
        let {data} = await axios.post('/api/join-game',{code,username})

        if (data.error != null) {
            setIsLoading(false)
            setMessage(data.error)
            setShowPopUp(true)
            return;
        }
        

        // valido que exista ese juego en la base de datos
        if(data.length == 0) {
            setIsLoading(false)
            setMessage(`No se encontró ningún juego con el código`)
            setShowPopUp(true)
            return;
        }

        router.push(`/game/${code}`)
      }

    return (
        <div  className='join-game'>
            {showPopUp && <PopUp message={message} code={code} closePopUp={closePopUp} />}
            {isLoading && <Loader show={true} />}

            {}

            <h3>Unirme a una partida</h3>
            <label htmlFor="">Nombre:</label>
            <input 
                type="text" 
                required
                value={username}
                onChange={handleUsernameChange}
                maxLength={30}
            />

            <h3>Inserte el codigo</h3>

            <input
                type="text"
                value={code}
                onChange={handleChange}
                maxLength={6}
            />
            <button
                onClick={handleClick}
            >Unirme</button>
        </div>
    )
}