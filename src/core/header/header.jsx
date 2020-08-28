import React, { useState } from 'react';

import { Link } from "react-router-dom";

import './header.css';

const navItems = [{
    url: '/blog',
    label: '博客'
}, {
    url: '/about',
    label: '关于'
}];

const Header = (props) => {
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
                    <li className="more-links">
                        <Link to="#" className="x">
                            <span>更多</span>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </Link >
                        <ol>
                            <li><Link to="/achive">博客归档</Link></li>
                            <li><Link to="/contact">联系我</Link></li>
                        </ol>
                    </li>
                    <li className="github-logo">
                        <a href={`https://github.com/${ process.env.REACT_APP_GITHUB }`} target="_blank" rel="noopener noreferrer">
                            <svg className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
                <div className={`navi-trigger ${show}`} onClick={ () => setShow(!show) }>
                    <div className="holder">
                        { show ? (
                            <svg viewBox="0 0 16 16" className="bi bi-sort-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M3 2a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 2z"/>
                              <path fillRule="evenodd" d="M5.354 10.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 11.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 16 16" className="bi bi-text-indent-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        ) }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;