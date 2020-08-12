import React, { useState } from 'react';

import { Link } from "react-router-dom";

import './header.css';

const navItems = [{
    url: '/blog',
    label: 'Blog'
}, {
    url: '/about',
    label: '关于'
}];


function Header(props) {
    const [ show, setShow ] = useState(false);
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link to={ `/` }>{ process.env.REACT_APP_TITLE || '' }</Link>
                </div>
                <ul className={ `navi ${show}` }>
                    { navItems && navItems.map((item, index) => (
                        <li key={ index }>
                            <Link to={ `${item.url || '/'}` }  onClick={ () => setShow(false) }>{ item.label }</Link>
                        </li>
                    ))}
                </ul>
                <div className="navi-trigger" onClick={ () => setShow(!show) }>
                    <div>=</div>
                </div>
            </div>
        </header>
    );
}

export default Header;