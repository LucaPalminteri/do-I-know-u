import React from "react";
import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import supabase from "@/utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { game } from "@/types/types";


function Code() {

    let isEveryoneReady:boolean = false

    supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: '*',table: 'games' }, async (payload:RealtimePostgresChangesPayload<game>) => {
         console.log(payload.new);
         isEveryoneReady = true
    }).subscribe()

    return (
        <div className="do-i-knou-you">
            {
                isEveryoneReady ?
                <Questions/>
                :
                <WaitConfirmation />
            }
        </div>
    );
}

export default Code;
