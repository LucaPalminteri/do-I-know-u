import { GameQuestionGame } from "@/classes/GameQuestionGame";
import { player_question, questions_games } from "@/types/types";
import supabase from "./supabase";

// GET Functions

export async function getPlayers(gameId:string) {
    let { data } = await supabase
    .from("players_games")
    .select()
    .eq('game',gameId)

    return data;
}

export async function getGame(code:string) {
    let res = await supabase
        .from("games")
        .select("*, players_games (*)")
        .eq("code", `${code}`);

    if(res == null || res.error) return null;

    return res.data[0];
}

export async function getPlayerAnswer(questionID: string, playerID: string) {
    let { data } = await supabase.from("players_questions")
    .select("*, questions_games(*)")
    .eq('question', questionID)
    .eq('player',playerID)

    if (data == null || data == undefined) return [];
    
    return data;
}

export async function getPlayersQuestions(playerID: string) {
    let { data } = await supabase
    .from('players_questions')
    .select()
    .eq('player',playerID)

    if (data == null || data == undefined) return [];

    return data;
}

export async function getPlayersQuestionsByQuestionAndPlayer(questionID: number, playerID:string) {
    let { data, error } = await supabase
    .from("players_questions")
    .select("*, questions_games(*)")
    .eq('question', questionID)
    .eq('player', playerID)

    if (data == null || data == undefined) return [];

    console.log({data,error});
    return data;
}

export function getRandomCode():string 
{
    let code:string = ""
    let charASCII:number = 0

    for (let i = 0; i < 6; i++) 
    {
        charASCII = Math.floor(Math.random() * 25) + 65
        code += String.fromCharCode(charASCII)
    }

    return code
}

export async function getGameAndPlayerGame(code: string, player:string) {
    let { data, error } = await supabase
    .from("games")
    .select("*, players_games (*), questions_games(*)")
    .eq('code', code)
    .eq('players_games.username', player)
    .eq('questions_games.isReady', false)
    
    if (data == null || data == undefined) return null;

    let gameQuestionGame = new GameQuestionGame(data)


    return gameQuestionGame;
}

// INSERT Functions

export async function insertPlayerQuestion(playerQuestion: player_question) {
    let { data,error } = await supabase
    .from("players_questions")
    .insert(playerQuestion)
    .select()

    console.log({data,error});
    if (data == null || data == undefined) return;
}

export async function insertGame(code: string) {
    let { data } = await supabase
    .from("games")
    .insert({ code })
    .select();

    if (data == null || data == undefined) return null;

    return data[0];
}

export async function insertPlayerGame(gameID: string, username: string) {
    let { data } = await supabase
    .from("players_games")
    .insert({ game: gameID, username,place:1 })
    .select();

    if (data == null || data == undefined) return;

    return data[0];
}

export async function insertQuestionGame(questionGame: questions_games) {
    let { data } = await supabase
    .from("questions_games")
    .insert(questionGame)

    if (data == null || data == undefined) return;
}

// UPDATE Functions

export async function updatePlayersCountInGame(playersCount: number, code: string) {
    let { data } = await supabase
        .from("games")
        .update({ players_count: playersCount })
        .eq("code", `${code}`)
        .select();

    if (data == null || data == undefined) return null;

   // return data[0]
}


// DELETE Functions

export async function deletePlayerQuestion(playerID: string) {
    await supabase.from("players_questions").delete().eq("player", playerID)
}

export async function deletePlayerGame(playerID: string) {
    await supabase.from("players_games").delete().eq("id", playerID)
}

export async function deleteQuestionGame(gameID: string) {
    await supabase.from("questions_games").delete().eq("game_id", gameID)
}

export async function deleteGame(gameID: string) {
    await supabase.from("games").delete().eq("id", gameID)
}