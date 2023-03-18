import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import { getTokenInfo } from "@/utils/Functions";
import { getRoundPoints, getStartedGame } from "@/utils/databaseFunctions";

async function Code() {
    let { code } = getTokenInfo()

    let responses = await getRoundPoints();
    let res = await getStartedGame(code)
    let questions = await Questions()

    console.log(responses);

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