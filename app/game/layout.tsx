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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const nextCookies = cookies();
    const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

    let { username } = jwt.verify(
        cookie?.value,
        process.env.NEXT_PUBLIC_TOKEN_NAME
    );

    //let code: string = params.code;
    let code: string = 'RHMNAM';

    let res = use(getInfo(code));

    let arrUsers = res?.players_games.map(
        (username: player_game, index: number) => (
            <li key={index}>{username.username}</li>
        )
    );


  return (
    <div>
      <div className="game-room">

            <main>
                {children}
                {false && <WebcamComponent/>}
            </main>

            <aside>
                <div className="inicio-link">
                    <Link href={"/"}>Inicio</Link>
                </div>
                <div className="players">
                    <p>Usted: {username}</p>
                    <h3>Participantes: {res?.players_count} en total</h3>
                    <ol>{arrUsers}</ol>
                </div>

                <div className="code">
                    <h3>code ==== {code}</h3>
                    <ShareButton code={code} />
                    <LeaveGameButton code={code} username={username}/>
                </div>
            </aside>

        </div>
    </div>
  )
}
