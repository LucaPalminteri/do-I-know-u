//'use client'
import React, { useEffect, useState } from "react";
//import AOS from "aos";
//import "aos/dist/aos.css";
import Questions from "@/components/Questions";
import { setInterval } from "timers/promises";

function Code() {

    // TODO: get client name to triger the isReady value

    // useEffect(() => {
    //     AOS.init();
    //     AOS.refresh();
    //   }, []);

    //const [isReady, setIsReady] = useState(true);

    function testing() {
        setInterval(5000,<Questions/>)
    }

    function handleStart() {
        //setIsReady(prev => !prev)
    }

    return (
        <div className="do-i-knou-you">
            {/* <h1 className="title">Te Conozco?</h1> */}
            {/* {isReady ?  */}
                {/* // <div data-aos="fade-down" data-aos-duration={600} data-aos-delay={2800}> */}
                <div >
                    <Questions/>
                </div> 
             {/* : <button onClick={handleStart}>Empezar</button>} */}
            {/* : <></>} */}
        </div>
    );
}

export default Code;
