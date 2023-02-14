import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export function createToken(username: string, code: string): string {

    const token: string = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, username, code
        },
        process.env.NEXT_PUBLIC_TOKEN_NAME!
      );
    
    const serialized: string = serialize(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
    });

    return serialized
}

export function deleteToken(): string {
    const serialized: string = serialize(process.env.NEXT_PUBLIC_TOKEN_PUBLIC_NAME!, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });

    return serialized
}
