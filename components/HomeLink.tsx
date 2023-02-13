'use client'

import Link from 'next/link'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

function HomeLink() {
  return (
    <div  >
        <Link href={"/"} className="inicio-link">
            <HomeIcon style={{marginRight:10}}/>
            <h2>Inicio</h2> 
        </Link>
    </div>
  )
}

export default HomeLink