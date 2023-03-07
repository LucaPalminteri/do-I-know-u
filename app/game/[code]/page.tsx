import React from "react";
import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";


function Code() {

    let isEveryoneReady:boolean = false

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
