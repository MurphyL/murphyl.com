import React from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const LANG_TYPES = {
    'lang-sh': 'Shell',
    'lang-awk': 'Awk',
    'lang-lua': 'Lua',
    'lang-java': 'Java',
    'lang-bash': 'Bash',
    'lang-shell': 'Shell',
    'lang-js': 'JavaScript',
    'lang-javascript': 'JavaScript',
    'lang-dockerfile': 'Dockerfile'
};

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title' }, <span type={ type.toUpperCase() }>{ children }</span>);
}

const H3 = (props) => (<Title type='h3' { ...props } />);
const H4 = (props) => (<Title type='h4' { ...props } />);
const H5 = (props) => (<Title type='h5' { ...props } />);
const H6 = (props) => (<Title type='h6' { ...props } />);

const Prepare = ({ children }) => {
    if(children && children.type === 'code') {
        const langType = LANG_TYPES[children.props.className] || 'Text';
        return (
            <div className="code-block" desc={ langType }>
                <pre>{ children }</pre>
            </div>
        )
    }
    return (
        <div>TODO prepare block</div>
    );
};

const Paragraph = ({ children }) => {
    if(children && Array.isArray(children)) {
        if(children[0] && children[0].type === 'img') {
            return (
                <p className="image">{ children }</p>
            )
        }
    }
    return (
        <p className="paragraph">{ children }</p>
    );
};

export const markdownOptions = {
    overrides: {
        h1: {
            component: H3
        },
        h2: {
            component: H3
        },
        h3: {
            component: H3
        },
        h4: {
            component: H4
        },
        h5: {
            component: H5
        },
        h6: {
            component: H6
        },
        p: {
            component: Paragraph
        },
        pre: {
            component: Prepare
        },
        div: {
            props: {
                className: 'markdown-to-jsx'
            }
        },
        table: {
            props: {
                className: 'm10',
                border: 1,
                cellSpacing: 0,
                cellPadding: 0,
            }
        },
    }
};

export const highlightCodeBlock = () => {
    setTimeout(() => {
        hljs.configure({
            tabReplace: '    ',
        });
        hljs.initHighlighting();
        const codes = document.querySelectorAll('.code-block code');
        codes.forEach((block) => {
            hljs.highlightBlock(block);
        }, 50);
    });
};