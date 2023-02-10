'use client'
import React, { useState } from "react";

function Code() {

    const [isReady, setIsReady] = useState(false);

    function handleStart() {
        setIsReady(prev => !prev)
    }

    return (
        <div className="do-i-knou-you">
            {isReady ? 
                <div>
                    <ol>
                        <li>Tirar los dados</li>
                    </ol>
                </div> 
            : <button onClick={handleStart}>Empezar</button>}
        </div>
    );
}

export default Code;
