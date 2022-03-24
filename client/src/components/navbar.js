import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <ul className='nav-bar-ul'>
            <li><Link to="Registration">Registration Page</Link></li>
            <li><Link to="Account">Account Page</Link></li>
            <li><Link to="About">About Page</Link></li>
        </ul>
    )
}