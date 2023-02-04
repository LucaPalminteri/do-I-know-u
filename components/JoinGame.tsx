'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from "react";

export default function JoinGame() {

    const [state, setState] = useState(false)
    const [value, setValue] = useState('');

    const router = useRouter()

    function toggleState() {
        setState(prev => !prev)
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase()
        if (newValue.match(/^[A-Z]+$/) || newValue == "") {
            setValue(newValue);
        }
    };

    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (value.length < 6) return;
        router.push(`/game/${value}`)
      }

    return (
        <div>
            <button
                onClick={()=> toggleState()}
            >Unirme a una partida</button>
            {
                state &&
                <>
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
                </>
            }
        </div>
    )
}