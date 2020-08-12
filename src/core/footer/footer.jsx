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
                                <li><Link rel="noopener noreferrer" to="/wmp/writer">编辑器</Link></li>
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
                                        <img alt="GitHub followers" src={`https://img.shields.io/github/followers/${ process.env.REACT_APP_GITHUB }?label=Follow&style=social`} />
                                    </a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div className="copyright">
                    <div>Copyright © 2020 { process.env.REACT_APP_TITLE }, All rights reserved. Host by <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">ZEIT.co</a></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;