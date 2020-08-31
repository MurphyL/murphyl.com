import React from 'react';

import { Link } from "react-router-dom";

import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="sitemap">
                    <div className="logo">
                        <Link to={ `/` } rel="noopener noreferrer">
                            <img src="/image/icon.png" alt={ process.env.REACT_APP_TITLE } />
                        </Link>
                    </div>
                    <dl className="section navi">
                        <dt>站点地图</dt>
                        <dd>
                            <ul>
                                <li><Link rel="noopener noreferrer" to="/blog">博客</Link></li>
                                <li><Link rel="noopener noreferrer" to="/achive">归档</Link></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl className="section links">
                        <dt>友情链接</dt>
                        <dd>
                            <ul>
                                <li><a href="https://cijian.us" target="_blank" rel="noopener noreferrer">此间·我们</a></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl className="section social">
                        <dt>社交</dt>
                        <dd>
                            <ul>
                                <li>
                                    <a href={`https://github.com/${ process.env.REACT_APP_GITHUB }`} target="_blank" rel="noopener noreferrer">
                                        <img alt="GitHub followers" src={`https://img.shields.io/github/followers/${ process.env.REACT_APP_GITHUB }?label=${ process.env.REACT_APP_GITHUB }&style=social`} />
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://github.com/${ process.env.REACT_APP_GITHUB }`} target="_blank" rel="noopener noreferrer">
                                        <img alt="GitHub followers" src={`https://img.shields.io/twitter/follow/MurphyLuo?label=MurphyLuo&style=social`} />
                                    </a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div className="copyright">
                    <p>Copyright ©2020 { process.env.REACT_APP_TITLE }，All rights reserved，</p>
                    <p>
                        <span>Host by</span>
                        <a className="vercel-logo" href="https://vercel.com/" rel="noopener noreferrer" target="_blank" title="ZEIT.co">
                            <svg role="img" width="53" height="12" aria-label="Vercel Inc." viewBox="0 0 283 64" fill="var(--geist-foreground)">
                                <path d="M37 0l37 64H0L37 0zM159.6 34c0-10.3-7.6-17.5-18.5-17.5s-18.5 7.2-18.5 17.5c0 10.1 8.2 17.5 19.5 17.5 6.2 0 11.8-2.3 15.4-6.5l-6.8-3.9c-2.1 2.1-5.2 3.4-8.6 3.4-5 0-9.3-2.7-10.8-6.8l-.3-.7h28.3c.2-1 .3-2 .3-3zm-28.7-3l.2-.6c1.3-4.3 5.1-6.9 9.9-6.9 4.9 0 8.6 2.6 9.9 6.9l.2.6h-20.2zM267.3 34c0-10.3-7.6-17.5-18.5-17.5s-18.5 7.2-18.5 17.5c0 10.1 8.2 17.5 19.5 17.5 6.2 0 11.8-2.3 15.4-6.5l-6.8-3.9c-2.1 2.1-5.2 3.4-8.6 3.4-5 0-9.3-2.7-10.8-6.8l-.3-.7H267c.2-1 .3-2 .3-3zm-28.7-3l.2-.6c1.3-4.3 5.1-6.9 9.9-6.9 4.9 0 8.6 2.6 9.9 6.9l.2.6h-20.2zM219.3 28.3l6.8-3.9c-3.2-5-8.9-7.8-15.8-7.8-10.9 0-18.5 7.2-18.5 17.5s7.6 17.5 18.5 17.5c6.9 0 12.6-2.8 15.8-7.8l-6.8-3.9c-1.8 3-5 4.7-9 4.7-6.3 0-10.5-4.2-10.5-10.5s4.2-10.5 10.5-10.5c3.9 0 7.2 1.7 9 4.7zM282.3 5.6h-8v45h8v-45zM128.5 5.6h-9.2L101.7 36 84.1 5.6h-9.3L101.7 52l26.8-46.4zM185.1 25.8c.9 0 1.8.1 2.7.3v-8.5c-6.8.2-13.2 4-13.2 8.7v-8.7h-8v33h8V36.3c0-6.2 4.3-10.5 10.5-10.5z"></path>
                            </svg>
                        </a>
                        <span>。</span>
                    </p> 
                </div>
            </div>
        </footer>
    );
}

export default Footer;