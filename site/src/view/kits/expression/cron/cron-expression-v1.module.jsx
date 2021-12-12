import { useMemo, useState } from 'react';

import Ajv from "ajv"
import kindOf from 'kind-of';
import cronstrue from 'cronstrue';

import { useDocumentTitle } from 'plug/hooks';

import { TextArea } from 'plug/extra/form-item/form-item.module';
import { CodeBlock } from 'plug/extra/source-code/source-code.module';

import styles from './cron-expression-v1.module.css';

const FIELDS = [
    ['second', 'minute', 'hour', 'day of month', 'month', 'day of week', 'year'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N'],
];

const validate = new Ajv().compile({
    "type": "array"
});

export default function CronExpressionParser() {
    useDocumentTitle('Cron Expression Parser');
    const [expression, setExpression] = useState('0 0 * 1 * ? *');
    const converted = useMemo(() => {
        const parts = expression.split(/\s+/);
        const explain = parts.map(part => {
            if (part === '*' || part === '?') {
                return 'each';
            } else if (part === '0') {
                return (parseInt(part) > 0) ? `${part}th` : part;
            } else {
                return part;
            }
        })
        return {
            parts,
            explain,
            description: cronstrue.toString(expression, { verbose: true })
        };
    }, [expression]);
    return (
        <div className={styles.root}>
            <h3>Cron Expression</h3>
            <TextArea value={expression} onChange={e => setExpression(e)} />
            <h3>Expression Description</h3>
            <div>{converted.description}</div>
            <h3>Parsing Details</h3>
            <CodeBlock value={JSON.stringify([converted.parts, converted.explain, ...FIELDS], null, 2)} />
            <h3>References</h3>
            <ul>
                <li>
                    <a href="https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm">Oracle® Role Manager Integration Guide - A Cron Expressions</a>
                </li>
            </ul>
        </div>
    );
};