'use client'
import React, { useState } from "react";
import supabase from "@/utils/supabase";

function Code() {

    // TODO: get client name to triger the isReady value

    const [isReady, setIsReady] = useState(false);

    function handleStart() {
        setIsReady(prev => !prev)
    }

    return (
        <div className="do-i-knou-you">
            <h1 className="title">Te Conozco?</h1>
            {isReady ? 
                <div>
                    <ol>
                        <li>Tirar los dados</li>
                    </ol>
                </div> 
            // : <button onClick={handleStart}>Empezar</button>}
            : <></>}
        </div>
    );
}

export default Code;
