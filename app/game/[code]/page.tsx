import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import { getTokenInfo } from "@/utils/Functions";
import { getRoundPoints, getStartedGame } from "@/utils/databaseFunctions";

async function Code() {
    let { code } = getTokenInfo()

    let responses = await getRoundPoints();
    let res = await getStartedGame(code)
    let questions = await Questions()

    // TODO: Create logic to retrieve the answer of each player and display the points
     
    return (
        <div className="do-i-knou-you">
            {
                res ?
                    <>{questions}</>
                    :
                    <WaitConfirmation />
            }
        </div>
    );
}

export default Code;