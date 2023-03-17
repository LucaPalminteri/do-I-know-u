import React from 'react'
import HomeLink from '@/components/HomeLink';

function Information() {
    return (
        <div className='information'>
            <HomeLink />
            <h1>¿Cómo se juega?</h1>
            <h2>Introducción</h2>
            <p>
                El juego presenta 4 actividades: 2 situaciones y 2 prendas.
                En las situaciones si yo fuera... y Lo que haría los jugadores protagonizan distintas circunstancias, algunas comunes y otras disparatadas. cada caso admite 5 desenlaces posibles.
                El protagonista lee la situacion en voz alta y elige su respuesta en secreto. Los demás jugadores votan lo que creen que el jugador ha elegido. Luego se descubre el voto y quienes aciertan avanzan una casilla, el jugador en turno avanza tantas casillas como votos acertados recibió.
            </p>

            <p>
                Las situaciones son bien resueltas por quienes conocen más a los demás y pueden prever de qué maneera actuaría cierta persona en determinada situación.
                También avanzan con buen paso aquellos que son claros en sus elecciones y por lo tanto más predecibles para quienes los conocen.
            </p>

            <p>
                Para avanzar más en el juego también pueden realizarse dos clases de prendas: sería capaz de... en la que hay que hacer alguna tonteria y soy como... donde los jugadores deben descubrir un personaje usando 3 pistas o bien haciendo gestos para imitar a la persona en cuestión.
            </p>

        </div>
    )
}

export default Information