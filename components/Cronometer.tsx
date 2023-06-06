'use client'
import React, { useEffect, useState } from 'react'


function Cronometer() {

    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(0)

    if (sec >= 60) {
        setMin(prev => prev + 1)
        setSec(0)
    }

    useEffect(() => {
        setInterval(() => {
            setSec(prev => prev + 0.5)
        }, 1000)
    }, [])

    return (
        <div className='cronometer'>{String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}</div>
    )
}

export default Cronometer