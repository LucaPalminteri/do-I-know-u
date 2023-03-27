import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import { getTokenInfo } from "@/utils/Functions";
import { getPlayers, getRoundPoints, getStartedGame } from "@/utils/databaseFunctions";
import supabase from "@/utils/supabase";

async function Code() {
    let { code } = getTokenInfo()

    let responses = await getRoundPoints();
    let res = await getStartedGame(code)
    let questions = await Questions()
    let players = await getPlayers(responses.game_id)

    let playerTurn = responses.players_questions.find((player:any) => player.players_games.place == responses.player_turn)
    let options = responses.player_questions.map( (player:any) => {
        // see if the answer of each player matches the answer of the player in turn
        if(player.option == playerTurn.option) {
            console.log('add each');
        }
    }
    )
     
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

export async function getPlayersQuestionsByQuestionAndPlayer(questionID: number, playerID: string) {
    let { data, error } = await supabase
        .from("players_questions")
        .select("*, questions_games(*)")
        .eq('question', questionID)
        .eq('player', playerID)

    if (data == null || data == undefined) return [];

    console.log({ data, error });
    return data;
}