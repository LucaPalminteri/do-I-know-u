import React, { MouseEventHandler } from 'react';

const PopUp = ({ message, closePopUp, code }:{message:string, closePopUp:MouseEventHandler<HTMLButtonElement>, code?:string | null}) => {
  return (
    <div className="popup-container">
      <div className="popup-overlay" />
      <div className="popup-box">
        <p>{message} <span style={{color: 'lightgreen'}}>{code}</span></p>
        <button className="popup-close" onClick={closePopUp}>Close</button>
      </div>
    </div>
  );
};

export default PopUp;