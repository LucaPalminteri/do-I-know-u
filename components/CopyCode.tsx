'use client'

import React from 'react'
import LinkIcon from '@mui/icons-material/Link';

function CopyCode({ code }: { code: string }) {

    function handleCopy() {
        navigator.clipboard.writeText(code);
    }

    return (
        <button onClick={handleCopy}><LinkIcon style={{ marginRight: 10 }} />{code}</button>
    )
}

export default CopyCode