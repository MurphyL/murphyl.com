import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import { connect } from 'react-redux';

// highlight.js
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import './post.css';

const LANG_TYPES = {
    'lang-sh': 'Shell'
};

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title' }, children);
}

const H3 = (props) => (<Title type='h3' { ...props } />);

const Prepare = ({ children }) => {
    if(children && children.type === 'code') {
        const langType = LANG_TYPES[children.props.className] || 'Text';
        return (
            <div className="code-block">
                <pre>{ children }</pre>
                <div className="lang-type">{ langType }</div>
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

const markdownOptions = {
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
            component:  (props) => (<Title type='h4' { ...props } />)
        },
        h5: {
            component:  (props) => (<Title type='h5' { ...props } />)
        },
        h6: {
            component:  (props) => (<Title type='h6' { ...props } />)
        },
        p: {
            component: Paragraph
        },
        pre: {
            component: Prepare
        },
        div: {
            props: {
                className: 'content'
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

const highlightCodeBlock = () => {
    hljs.configure({
        tabReplace: '    ',
    });
    hljs.initHighlighting();
    document.querySelectorAll('.code-block code').forEach((block) => {
        hljs.highlightBlock(block);
    });    
}

function Post({ blogAction, dispatch }) {
    const { unique } = useParams();
    const [ post, setPost ] = useState({});
    useEffect(() => {
        dispatch({ type: 'LOCAL_POST', filename: unique });
    }, [ dispatch, unique ]);
    useEffect(() => {
        blogAction.then(([ first ]) => {
            if(!first) {
                return;
            }
            setPost(first);
            setTimeout(highlightCodeBlock, 50);
        });
    }, [ blogAction ]);
    return (
        <article>
            <h2>{ post.title || '' }</h2>
            <section>
                <Markdown children={ post.markdown || '' } options= { markdownOptions }/>
            </section>
        </article>
    );
};

const mapStateToProps = ({ blogAction }, ownProps) => {
    return {
        blogAction
    }
}


export default connect(mapStateToProps)(Post);