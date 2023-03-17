"use client";
import React from "react";
import ShareIcon from '@mui/icons-material/Share';

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

    return <button onClick={shareHandler}><ShareIcon style={{ marginRight: 10 }} />Compartir partida</button>;
}

export default ShareButton;
