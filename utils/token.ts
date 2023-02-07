import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export function createToken(username: string): string {

    const token: string = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, username
        },
        process.env.NEXT_PUBLIC_TOKEN_NAME!
      );
    
    const serialized: string = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
    });

    return serialized
}

export function deleteToken(): string {
    const serialized: string = serialize("token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });

    return serialized
}
