import Link from "next/link";
import React, { use } from "react";
import ShareButton from "@/components/ShareButton";
import supabase from "@/utils/supabase";
import LeaveGameButton from "@/components/LeaveGameButton";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import WebcamComponent from "@/components/Webcam";
import CopyCode from "@/components/CopyCode";
import UserList from "@/components/UserList";
import Cronometer from "@/components/Cronometer";

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

    let { username, code } = jwt.verify(
        cookie?.value,
        process.env.NEXT_PUBLIC_TOKEN_NAME
    );

    let res = use(getInfo(code));

    
  

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
                    <ol><UserList players_games={res?.players_games} username={username}/></ol>
                </div>

                <Cronometer />
                
                <div className="code">
                    <CopyCode code={code}/>
                    <ShareButton code={code} />
                    <LeaveGameButton code={code} username={username}/>
                </div>
            </aside>

        </div>
    </div>
  )
}
