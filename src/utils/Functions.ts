import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";
import { token } from '@/src/types/types';

export function getTokenInfo(): token {

    const nextCookies = cookies();
    const cookie = nextCookies.get(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!);

    if (cookie != undefined) {
        let token: any = jwt.verify(
            String(cookie?.value),
            String(process.env.NEXT_PUBLIC_TOKEN_NAME)
        );

        return {
            code: token.code,
            player: token.username
        }
    }
    else return { code: '', player: '' }
}