
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