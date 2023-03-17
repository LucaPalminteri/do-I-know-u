import Questions from "@/components/Questions";
import WaitConfirmation from "@/components/WaitConfirmation";
import { getTokenInfo } from "@/utils/Functions";
import supabase from "@/utils/supabase";
import { redirect } from 'next/navigation';

async function getInfo() {
    let { code } = getTokenInfo()
    try {
        const { data } = await supabase
            .from("games")
            .select('hasStarted')
            .eq('code', code)


        if (data == null) return;
        let [game] = data

        return game.hasStarted;
    } catch (error) {
        console.error(error);
        return {}
    }
}
async function getRoundPoints() {
    try {
        let { data, error } = await supabase
            .from("questions_games ")
            .select("*, players_questions (*)")
            .eq('isReady', true)
            .order('id', {ascending: false})
            .limit(1)

            if (data == null) return []
        return data[0]
    }
    catch (error) {
        console.error(error)
    }
}

async function Code() {

    let responses = await getRoundPoints();
    let res = await getInfo()
    let questions = await Questions()
    supabase
        .channel('*')
        .on('postgres_changes', { event: '*', schema: '*', table: 'games' }, async (payload) => {
            if (payload.new) redirect('/');
            res = getInfo()
        }).subscribe()

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
