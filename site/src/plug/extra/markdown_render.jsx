import React from 'react';
import { Link } from "react-router-dom";

import Markdown2JSX from 'markdown-to-jsx';

import { Title, Paragraph, Prepare } from 'plug/extra/definition/definition.module.jsx';

Markdown.displayName = 'Markdown2JSX';

const H2 = (props) => <Title level='h2' {...props} />;

const definedOption = {
    overrides: {
        h1: {
            component: H2
        },
        h2: {
            component: H2
        },
        h3: {
            component: function H3(props) { return <Title level='h3' {...props} /> }
        },
        h4: {
            component: function H3(props) { return <Title level='h4' {...props} /> }
        },
        h5: {
            component: function H3(props) { return <Title level='h5' {...props} /> }
        },
        a: {
            component: function OuterLink({ href, children }) {
                return /^http/.test(href) ? (<a href={href} rel="noopener noreferrer" target="_blank">{children}</a>) : (<Link to={href}>{children}</Link>);
            }
        },
        p: {
            component: Paragraph
        },
        pre: {
            component: Prepare
        },
        table: {
            props: {
                border: 1,
                cellSpacing: 0,
                cellPadding: 0,
            }
        }
    }
};

export default function Markdown({ content, options }) {
    return (
        <Markdown2JSX children={content || ''} options={options || definedOption} />
    );
}