import React from 'react';

import './footer.css';

function Footer(props) {
    const social = {};
    return (
        <footer>
            <div className="container">
                <div className="sitemap">
                    <div className="logo">
                        <a href={ `/` } rel="noopener noreferrer">
                            <img src="/image/icon.png" alt={ props.title } />
                        </a>
                    </div>
                    <dl className="section navi">
                        <dt>站点地图</dt>
                        <dd>
                            <ul>
                                <li><a href="/blog" rel="noopener noreferrer">博客</a></li>
                                {/** <li><a href="/docs">笔记</a></li> **/}
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
                                {/** (social && social.github) && **/ (
                                    <li>
                                        <a href={`https://github.com/MurphyL`} target="_blank" rel="noopener noreferrer">
                                            <img alt="GitHub followers" src={`https://img.shields.io/github/followers/MurphyL?label=Follow&style=social`} />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div className="copyright">
                    <div>Copyright © 2020 { props.title }. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;