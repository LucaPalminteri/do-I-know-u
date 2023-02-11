'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import PopUp from './PopUpMessage';
import Loader from './Loader';
import Link from 'next/link';
import Cookies from 'js-cookie'
import AOS from "aos";
import "aos/dist/aos.css";

const AOS_DURATION:number = 600;

export default function JoinGame() {

    //let cookies = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!)

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    const [code, setCode] = useState('');

    const [showPopUp, setShowPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [view, setView] = useState(false)


    const closePopUp = () => {
        setShowPopUp(false);
    };

    function toggleView() {
        setView(prev => !prev)
      }

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

            <h2 onClick={toggleView}>Unirme a una partida</h2>
            {
                view ?
            <>  
            <input 
                data-aos="fade-right"
                data-aos-duration={AOS_DURATION}
                type="text" 
                required
                value={username}
                onChange={handleUsernameChange}
                maxLength={30}
                placeholder='Nombre...'
            />

            <div className='code-input-container'>
                <h3
                    data-aos="fade-right"
                    data-aos-duration={AOS_DURATION + 200}
                >Código</h3>

                <input
                    data-aos="fade-left"
                    data-aos-duration={AOS_DURATION + 200}
                    type="text"
                    value={code}
                    onChange={handleChange}
                    maxLength={6}
                    className='code-input'
                />
            </div>

            <button
                data-aos="fade-left"
                data-aos-duration={AOS_DURATION + 400}
                onClick={handleClick}
            >Unirme</button>
            </> : <></>}
        </div>
    )
}