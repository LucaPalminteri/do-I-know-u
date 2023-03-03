import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";
import { token } from '@/types/types';

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

export function getTokenInfo():token {

    const nextCookies = cookies();
    const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

    if (cookie != undefined) {
        let token:any = jwt.verify(
            String(cookie?.value),
            String(process.env.NEXT_PUBLIC_TOKEN_NAME)
        );

        return {
            code: token.code,
            player: token.username
        }
    }
    else return {code:'',player:''}
}