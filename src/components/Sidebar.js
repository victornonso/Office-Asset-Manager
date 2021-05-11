import React from 'react';
import { FaCamera } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import './Sidebar.css';



function sidebar(){
    return (
    <div className="side-bar">
            <img src="/images/user-profile-pic.jpeg" alt=""/>     
            <FaCamera className='cam-icon' size='30px'/>
            <ul>
                <li><a href="">Profile</a></li>
                <li><a href="">Dashboard</a></li>
                <li className="active bg-danger"><a href="">Assets</a></li>
                <li><a href="">Users</a></li> 
            </ul>
     </div>   
 )
}

export default sidebar