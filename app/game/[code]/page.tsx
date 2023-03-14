import React, { use } from "react";
import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import supabase from "@/utils/supabase";
import { getTokenInfo } from "@/utils/Functions";
import { redirect } from 'next/navigation';

async function getInfo() {  
    let {code, player} = getTokenInfo()
    try {
        const { data, error } = await supabase
            .from("games")
            .select('hasStarted')
            .eq('code',code)


        if (data == null) return;
        let [game] = data
        
        return game.hasStarted;
    } catch (error) { 
        console.error(error);
        return {}
    }
}

function Code() {

    let res = use(getInfo())

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'games' }, async (payload) => {
        if (payload.new) redirect('/');
         res = getInfo()
    }).subscribe()

    return (
        <div className="do-i-knou-you">
            {
                res ?
                <Questions/>
                :
                <WaitConfirmation />
            }
        </div>
    );
}

export default Code;
