import React from 'react';

const Loader = ({ show }:{show:boolean}) => {
  return (
    <div className={`loader-container ${show ? 'active' : ''}`}>
      <div className="loader-overlay" />
      <div className="loader">
        <div className="spinner" />
      </div>
    </div>
  );
};

export default Loader;