import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import React from 'react'
import ShareButton from '@/components/ShareButton'


function Code({params}:{params:Params}) {

    let code = params.code

  return (
    <div>
        <Link href={'/'}>Inicio</Link>
        <h3>
            code ==== {code}
        </h3> 
        <h3>Participantes</h3>
        <ol>
            <li>Pedro</li>
            <li>Luca</li>
            <li>Agusto</li>
        </ol>
        <ShareButton code={code}/>
    </div>
  )
}

export default Code