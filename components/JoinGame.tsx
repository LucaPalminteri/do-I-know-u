'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import axios from 'axios';
import PopUp from './PopUpMessage';
import Loader from './Loader';

export default function JoinGame() {

    const [value, setValue] = useState('');

    const [showPopUp, setShowPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const closePopUp = () => {
        setShowPopUp(false);
    };

    const router = useRouter()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase()
        if (newValue.match(/^[A-Z]+$/) || newValue == "") {
            setValue(newValue);
        }
    };

    const handleClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        // Valido que tenga minimo 6 caracteres
        if (value.length < 6) {
            setMessage('El código debe tener 6 letras')
            setShowPopUp(true)
            return;
        }
        setIsLoading(true)

        // Mando peticion al backend
        let {data} = await axios.post('/api/join-game',{data: `${value}`})
        

        // valido que exista ese juego en la base de datos
        if(data.length == 0) {
            setIsLoading(false)
            setMessage(`No se encontró ningún juego con el código`)
            setShowPopUp(true)
            return;
        }

        router.push(`/game/${value}`)
      }

    return (
        <div>
            {showPopUp && <PopUp message={message} code={value} closePopUp={closePopUp} />}
            {isLoading && <Loader show={true} />}

            <h3>Unirme a una partida</h3>

            <h3>Inserte el codigo</h3>

            <input
                type="text"
                value={value}
                onChange={handleChange}
                maxLength={6}
            />
            <button
                onClick={handleClick}
            >Unirme</button>
        </div>
    )
}