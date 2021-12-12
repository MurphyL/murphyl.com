import { useMemo, useState } from 'react';

import cronstrue from 'cronstrue';
import { parseExpression } from 'cron-parser';

import { useDocumentTitle } from 'plug/hooks';

import { TextArea } from 'plug/extra/form-item/form-item.module';

import styles from './cron-parser.module.css';

export default function CronExpressionParser() {
    useDocumentTitle('Cron Expression Parser');
    const [expression, setExpression] = useState('0 0 * 1 * ? *');
    const converted = useMemo(() => {
        const description = cronstrue.toString(expression, { verbose: true });
        var interval = parseExpression(expression);
        for (let i = 0; i < 5; i++) { 
            console.log(interval.next());
        }
        return description;
    }, [expression]);
    return (
        <div className={styles.root}>
            <h3>Cron Expression</h3>
            <TextArea value={expression} onChange={e => setExpression(e)} />
            <h3>Expression Description</h3>
            <div>{converted}</div>
            <h3>Parsing Details</h3>
        </div>
    );
};