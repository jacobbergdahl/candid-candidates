import React from 'react';
import './header.scss';

const Header = () => {
  return(
    <div className="wrapper-header">
      <div className="wrapper-inner-header">
        <h1>Candid Candidates</h1>
        <p className="support-header">Communicating creative, clever, caring candidates clearly</p>
      </div>
    </div>
  );
}

export default Header;