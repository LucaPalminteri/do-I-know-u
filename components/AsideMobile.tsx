'use client'
import React, {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import LeaveGameButton from './LeaveGameButton';
import ShareButton from './ShareButton';
import CloseIcon from '@mui/icons-material/Close';
import HomeLink from './HomeLink';


function AsideMobile({code,username}:{code:string,username:string}) {

    const [view, setView] = useState(false)
  return (
    <aside className='mobile-aside'>
        {
            view ?
            <header>
                <HomeLink/>
                <LeaveGameButton code={code} username={username}/>
                <ShareButton code={code}/>
                <CloseIcon fontSize='large'  onClick={()=> setView(false)}/>
            </header>
            :
            <MenuIcon fontSize='large' onClick={()=> setView(true)}/>
        }
    </aside>
  )
}

export default AsideMobile