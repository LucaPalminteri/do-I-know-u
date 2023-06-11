import React, { use } from "react";
import ShareButton from "@/src/components/ShareButton";
import supabase from "@/src/utils/supabase";
import LeaveGameButton from "@/src/components/LeaveGameButton";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CopyCode from "@/src/components/CopyCode";
import UserList from "@/src/components/UserList";
import HomeLink from "@/src/components/HomeLink";
import AsideMobile from "@/src/components/AsideMobile";

async function getInfo(code: string) {
    try {
        const { data, error } = await supabase
            .from("games")
            .select(`*, players_games (*)`)
            .eq("code", code);
        if (data == null) return;
        let [game] = data
        return game;
    } catch (error) { }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const nextCookies = cookies();
    const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

    let token: any = jwt.verify(
        String(cookie?.value),
        String(process.env.NEXT_PUBLIC_TOKEN_NAME)
    );

    let res = use(getInfo(token.code));

    return (
        <div>
            <div className="game-room">

                <main>
                    {children}
                </main>

                <aside className="desktop-aside">
                    <div>
                        <HomeLink />
                    </div>
                    <div className="players">
                        <ol><UserList players_games={res?.players_games} username={token.username} /></ol>
                    </div>

                    <div className="code">
                        <CopyCode code={token.code} />
                        <ShareButton code={token.code} />
                        <LeaveGameButton code={token.code} username={token.username} />
                    </div>
                </aside>
                <AsideMobile code={token.code} username={token.username} />

            </div>
        </div>
    )
}
