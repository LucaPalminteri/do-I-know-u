"use client";
import React from "react";

function ShareButton({ code }: { code: string }) {
    const shareData = {
        title: "Te Conozco?",
        text: "Unete a la partida y juguemos juntos!",
        url: `http://localhost:3000/game/${code}`,
    };

    const shareHandler = async () => {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={shareHandler}>Compartir codigo</button>;
}

export default ShareButton;
