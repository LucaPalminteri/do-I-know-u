'use client'

import React, {useRef} from 'react'
import Webcam from "react-webcam";

function WebcamComponent() {

    const webRef = useRef(null)

  return (
    <div>
        <Webcam ref={webRef}/>
    </div>
  )
}

export default WebcamComponent