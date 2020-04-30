import React from 'react';

import { Link } from "react-router-dom";

import './header.css';

function Header(props) {
    const navItems = [{
        url: '/blog',
        label: 'Blog'
    }, {
        url: '/about',
        label: '关于'
    }];
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <a href={ `/` }>{ process.env.REACT_APP_TITLE || '' }</a>
                </div>
                <ul className="navi">
                    { navItems && navItems.map((item, index) => (
                        <li key={ index }>
                            <Link to={ `${item.url || '/'}` }>{ item.label }</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;