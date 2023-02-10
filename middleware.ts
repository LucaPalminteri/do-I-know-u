import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import supabase from './utils/supabase'

export async function middleware(request: NextRequest) {
  
  let code = request.nextUrl.pathname.slice(6,12)

  if(request.nextUrl.pathname.length == 5) return NextResponse.next()

  try {
    const { data, error} = await supabase.from('games').select().eq('code',`${code}`)

    //TODO: validar si se conectan a una sala que este llena

    // si se ingresa un codigo por URL que no existe en la base de datos lo redirige al inicio
    if (data?.length == 0) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // todo ok
    if (code == data[0].code) {
      return NextResponse.next();
    }
  } catch (error) {
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/game/:code*']
}