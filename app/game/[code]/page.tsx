'use client'
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Code() {

    // TODO: get client name to triger the isReady value

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    const [isReady, setIsReady] = useState(true);

    function handleStart() {
        setIsReady(prev => !prev)
    }

    return (
        <div className="do-i-knou-you">
            <h1 className="title">Te Conozco?</h1>
            {isReady ? 
                <div data-aos="fade-down" data-aos-duration={600} data-aos-delay={2800}>
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
