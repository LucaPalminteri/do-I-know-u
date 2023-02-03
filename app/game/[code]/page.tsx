import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import React from 'react'


function Code({params}:{params:Params}) {

  return (
    <div>
        <Link href={'/'}>Inicio</Link>
        <h3>
            page: {params.code}
        </h3> 
    </div>
  )
}

export default Code