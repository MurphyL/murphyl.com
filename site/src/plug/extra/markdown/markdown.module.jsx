import React from 'react';

import styles from './markdown.module.css';

const Title = ({ type, children }) => {
    return React.createElement(type, { className: styles.title }, children);
}

const H3 = (props) => (<Title type='h3' { ...props } />);

const Paragraph = ({ children }) => {
    if(children && Array.isArray(children)) {
        if(children[0] && children[0].type === 'img') {
            return (
                <p className={styles.image}>{ children }</p>
            )
        }
    }
    return (
        <p className="paragraph">{ children }</p>
    );
};

const FlexImage = ({ items, alt }) => {
    return (
        <div className="flex-wrapper">
            { (JSON.parse(items) || []).map((item, index) => (
                <div className={`flex-item ${styles.image}`} key={ index }>
                    <img src={ item } alt={ alt || ''} />
                </div>
            )) }
        </div>
    );
};

const Prepare = ({ children }) => {
    return (
        <div className="prepare">{ children }</div>
    );
};

export default {
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
        FlexImage: {
            component: FlexImage
        }
    }
};