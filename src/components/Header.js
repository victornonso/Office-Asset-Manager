import React from 'react';
import './Header.css';

function Header(){
    return(
    <div className="header">
        <div className="logo">
            <img src="/images/logo.jpeg" alt=""/>        
        </div>
        <ul>
            <li>
            <img src="/images/user-profile-pic.jpeg" alt=""/> <span>Chukwuma Albert Obiazor <br/> Snr. Software Developer</span>
            </li>
        </ul>
               
    </div>
    )
}

export default Header;