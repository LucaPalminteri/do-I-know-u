import { GameQuestionGame } from "@/src/classes/GameQuestionGame";
import { player_question } from "@/src/types/types";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "./supabase";

// GET Functions

export async function getPlayers(gameId: string) {
    let { data } = await supabase
        .from("players_games")
        .select()
        .eq('game', gameId)

    return data;
}

export async function getGame(code: string) {
    let res = await supabase
        .from("games")
        .select("*, players_games (*)")
        .eq("code", `${code}`);

    if (res == null || res.error) return;

    return res.data[0];
}

export async function getGameByID(gameID: string) {
    let res = await supabase
        .from("games")
        .select("*, players_games (*)")
        .eq("id", `${gameID}`);

    if (res == null || res.error) return;

    return res.data[0];
}

export async function getStartedGame(code: string) {
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

export async function getPlayerAnswer(questionID: string, playerID: string) {
    let { data } = await supabase.from("players_questions")
        .select("*, questions_games(*)")
        .eq('question', questionID)
        .eq('player', playerID)

    if (data == null || data == undefined) return [];

    return data;
}

export async function getPlayersQuestions(playerID: string) {
    let { data } = await supabase
        .from('players_questions')
        .select()
        .eq('player', playerID)

    if (data == null || data == undefined) return [];

    return data;
}

export async function getLastPlayersQuestions(playerID: string) {
    let { data } = await supabase
        .from('players_questions')
        .select()
        .eq('player', playerID)
        .limit(1)
        .order('question', {ascending: false})

    if (data == null || data == undefined) return [];

    return data[0];
}

export async function getPlayersQuestionsByQuestionAndPlayer(questionID: number, playerID: string) {
    let { data, error } = await supabase
        .from("players_questions")
        .select("*, questions_games(*)")
        .eq('question', questionID)
        .eq('player', playerID)

    if (data == null || data == undefined) return [];

    return data;
}

export async function getPlayersQuestionsByQuestion(questionID: number) {
    let { data, error } = await supabase
        .from("players_questions")
        .select("*, questions_games(*)")
        .eq('question', questionID)

    if (data == null || data == undefined) return [];

    return data;
}

export function getRandomCode(): string {
    let code: string = ""
    let charASCII: number = 0

    for (let i = 0; i < 6; i++) {
        charASCII = Math.floor(Math.random() * 25) + 65
        code += String.fromCharCode(charASCII)
    }

    return code
}

export async function getGameAndPlayerGame(code: string, player: string) {
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

export async function getPlayersGames(code: string | undefined) : Promise<GameQuestionGame | null> {
    let { data, error } = await supabase
        .from("games")
        .select("*, players_games (*), questions_games(*)")
        .eq('code', code)
    if (data == null || data == undefined) return null;

    let gameQuestionGame: GameQuestionGame = new GameQuestionGame(data)

    return gameQuestionGame;
}

export async function getQuestionsGames(gameID: string) {
    let { data, error } = await supabase
        .from("questions_games")
        .select("*, games (*), questions (*)")
        .eq('game_id', gameID)

    if (data == null || data == undefined) return null;

    return data;
}

export async function getPlayerTurn(gameID: string) {
    let { data, error } = await supabase
        .from("questions_games")
        .select("player_turn")
        .eq('game_id', gameID)
        .eq('isReady', false)

    if (data == null || data == undefined) return null;

    return data[0].player_turn;
}

export async function getRoundPoints(gameID?: string) {
    try {
        let { data, error } = await supabase
            .from("questions_games ")
            .select("*, players_questions (*,  players_games(place))")
            .eq('isReady', true)
            .eq('game_id', gameID)
            .order('id', {ascending: false})
            .limit(1)

            if (data == null) return []
        return data[0]
    }
    catch (error) {
        console.error(error)
    }
}

// INSERT Functions

export async function insertPlayerQuestion(playerQuestion: player_question) {
    let { data, error } = await supabase
        .from("players_questions")
        .insert(playerQuestion)
        .select()

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
        .insert({ game: gameID, username, place: 1 })
        .select();

    if (data == null || data == undefined) return;

    return data[0];
}

export async function insertQuestionGame(questionGame: any) {
    let { data, error } = await supabase
        .from("questions_games")
        .insert(questionGame)

    if (data == null || data == undefined) return;

    return data[0]
}

// UPDATE Functions

export async function updatePlayersCountInGame(playersCount: number, code: string) {
    await supabase
        .from("games")
        .update({ players_count: playersCount })
        .eq("code", `${code}`)
}

export async function updateReadinessQuestionGame(gameID: number | undefined) {
    let { data, error } = await supabase
        .from('questions_games')
        .update({ isReady: true })
        .eq('id', gameID)
        .select()

    if (data == null) return null;

    return data[0]
}

export async function updateAnsweredCountInQuestionsGames(answeredCount: number, gameID: number | undefined) {
    await supabase
        .from('questions_games')
        .update({ answered_count: answeredCount })
        .eq('id', gameID)
}

export async function updatePlayerPoints(playerID:string, points:number | null = null) {

    let {data}:PostgrestResponse<{ points: number }> = await supabase
        .from('players_games')
        .select('points')
        .eq('id', playerID)

    if(data == null) return

    await supabase
        .from('players_games')
        .update({ points: points == null ? data[0].points + 1 : points})
        .eq('id', playerID)
}

// DELETE Functions

export async function deletePlayerQuestion(playerID: string) {
    let { data, error } = await supabase.from("players_questions").delete().eq("player", playerID)
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