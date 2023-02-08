import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import React, { use } from "react";
import ShareButton from "@/components/ShareButton";
import supabase from "@/utils/supabase";
import { player_game } from "@/types/games";
import LeaveGameButton from "@/components/LeaveGameButton";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import WebcamComponent from "@/components/Webcam";


async function getInfo(code: string) {
    try {
        const { data, error } = await supabase
            .from("games")
            .select(`*, players_games (*)`)
            .eq("code", code);
        if (data == null) return;
        return data[0];
    } catch (error) { }
}

function Code({ params }: { params: Params }) {
    

    const nextCookies = cookies();
    const cookie = nextCookies.get("token");

    let { username } = jwt.verify(
        cookie?.value,
        process.env.NEXT_PUBLIC_TOKEN_NAME
    );

    console.log(username);

    let code: string = params.code;

    let res = use(getInfo(code));

    let arrUsers = res?.players_games.map(
        (username: player_game, index: number) => (
            <li key={index}>{username.username}</li>
        )
    );

    return (
        <div className="game-room">
            <Link className="inicio-link" href={"/"}>Inicio</Link>
            <div className="players">
                <p>Usted: {username}</p>
                <h3>Participantes: {res?.players_count} en total</h3>
                <ol>{arrUsers}</ol>
            </div>

            <main>
                {res?.players_count >= 3 && <button>Empezar</button>}
                {false && <WebcamComponent/>}
            </main>

            <div className="code">
                <h3>code ==== {code}</h3>
                <ShareButton code={code} />
                <LeaveGameButton code={code} />
            </div>
        </div>
    );
}

export default Code;
