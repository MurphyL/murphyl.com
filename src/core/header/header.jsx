import React, { useState } from 'react';

import { Link } from "react-router-dom";

import './header.css';

const navItems = [{
    url: '/docs',
    label: '文档'
}, {
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
                    <a href={ `/` }>{ process.env.REACT_APP_TITLE || '' }</a>
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