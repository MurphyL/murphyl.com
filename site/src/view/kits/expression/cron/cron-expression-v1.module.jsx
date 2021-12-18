import { Fragment, useMemo, useState } from 'react';

import Ajv from "ajv"
import kindOf from 'kind-of';
import { parse as parseCron } from '@datasert/cronjs-parser';

import { useDocumentTitle } from 'plug/hooks';

import { TextArea } from 'plug/extra/form-item/form-item.module';
import { DataFrame } from 'plug/extra/data-table/data-table.module';
import { CodeBlock } from 'plug/extra/source-code/source-code.module';

import styles from './cron-expression-v1.module.css';


/**
 * cron parser:
 * 
 * - @vangware/cron - https://cron.vangware.com/
 * - cronstrue, @wolfpigeon/cronstrue
 * - @datasert/cronjs-parser - https://github.com/datasert/cronjs
 */

const FIELDS = ['second', 'minute', 'hour', 'day_of_month', 'month', 'day_of_week', 'year'];

// Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday
const WEEK_DAYS = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
};

// January, February, March, April, May, June, July, August, September, October, November, December
const MONTH_NAMES = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};

const validate = new Ajv().compile({
    "type": "array"
});

const join = (values) => {
    const last = (values.length > 1) ? values.pop() : null;
    return values.join(',  ') + (last ? `, and ${last}` : '');
};

const descIndex = (number) => {
    switch (number) {
        case 1: return '1st';
        case 2: return '2nd';
        default: return `${number}th`;
    }
};

/**
 * 描述周日期
 * @param {*} number 
 * @returns 
 */
const descWeekday = (number) => `${WEEK_DAYS[number]}(${descIndex(number)})` || 'invalid weekday';

const descMonth = (number) => `${MONTH_NAMES[number]}(${descIndex(number)})` || 'invalid month';

const resolve = (expression) => {
    const { expressions: [parsed] } = parseCron(expression, { hasSeconds: true });
    return {
        parsed,
        details: FIELDS.map((field, index) => {
            const part = parsed[field];
            if (part.all) {
                return 'every';
            }
            if (part.omit) {
                return 'omit';
            }
            if (index === 3) {   // day_of_month
                const result = [];
                if (kindOf(part.values) === 'array') {
                    part.values.forEach(number => {
                        result.push(descMonth(number));
                    });
                }
                if (kindOf(part.nearestWeekdays) === 'array') {
                    part.nearestWeekdays.forEach(weekday => {
                        result.push(`the weekday nearest day ${descIndex(weekday)}`);
                    });
                }
                return join(result) + ' of the month';
            }
            if (index === 5) {   // day_of_week
                const result = [];
                if (kindOf(part.values) === 'array') {
                    part.values.forEach(number => {
                        result.push(descWeekday(number));
                    });
                }
                if (kindOf(part.ranges) === 'array') {
                    part.ranges.forEach(range => {
                        result.push(`${descWeekday(range.from)} through ${descWeekday(range.to)}`);
                    });
                }
                if (kindOf(part.lastDays) === 'array') {
                    part.lastDays.forEach(number => {
                        result.push(`last ${descWeekday(number)}`);
                    });
                }
                if (kindOf(part.nthDays) === 'array') {
                    part.nthDays.forEach(({ day_of_week, instance }) => {
                        result.push(`${descIndex(instance)} ${descWeekday(day_of_week)}`);
                    });
                }
                console.log('week', result);
                return join(result) + ' of the month';
            }
            const result = [];
            if (kindOf(part.steps) === 'array') {
                part.steps.forEach(({ from, to, step }) => {
                    result.push(`at ${descIndex(from)} through ${descIndex(to)}, every ${step} ${field}s`);
                });
            }
            if (kindOf(part.ranges) === 'array') {
                part.ranges.forEach(range => {
                    result.push(`at ${descIndex(range.from)} through ${descIndex(range.to)}`);
                });
            }
            if (kindOf(part.values) === 'array') {
                part.values.forEach(value => {
                    if(index === 4) {   // 月份 
                        result.push(descMonth(value));
                    } else {
                        result.push(descIndex(value));
                    }
                });
            }
            return join(result);
        })
    };
};

export default function CronExpressionParser() {
    useDocumentTitle('Cron Expression Parser');
    const [expression, setExpression] = useState('1-2/3 1-2,3,4 * 2W SEP,OCT 1L */10');
    const converted = useMemo(() => {
        const parts = expression.split(/\s+/);
        try {
            return { parts, ...resolve(expression) };
        } catch (e) {
            console.log(e.message);
            return { parts };
        }

    }, [expression]);
    return (
        <div className={styles.root}>
            <h3>Cron Expression</h3>
            <TextArea value={expression} onChange={e => setExpression(e)} placeholder="Enter cron expression" />
            <h3>Parsing Details</h3>
            <DataFrame type="inline" data={[FIELDS.map(field => field.replaceAll('_', ' ')), converted.parts, converted.details]} />
            <h3>Cron Expression Description</h3>
            <div className={styles.desc}>
                {FIELDS.map((field, index) => (
                    <Fragment key={index}>
                        <dt>{field.replaceAll('_', ' ')}</dt>
                        <dd>
                            <div>steps</div>
                            <div>ranges</div>
                            <div>values</div>
                        </dd>
                    </Fragment>
                ))}
                <CodeBlock value={JSON.stringify(converted.parsed, null, 4)} />
            </div>
            <h3>References</h3>
            <ul>
                <li>
                    <a href="https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm">Oracle® Role Manager Integration Guide - A Cron Expressions</a>
                </li>
            </ul>
        </div>
    );
};