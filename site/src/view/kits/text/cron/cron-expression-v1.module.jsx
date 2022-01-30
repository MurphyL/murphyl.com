import { useMemo, useState } from 'react';

import Ajv from "ajv";
import { parse as parseCron } from '@datasert/cronjs-parser';

import { useDocumentTitle /** , useMetaInfo */ } from 'plug/hooks';

import { TextArea } from 'plug/extra/form-item/v1/form-item-v1.module';
import { DataFrame } from 'plug/extra/data-table/data-table.module';

import styles from './cron-expression-v1.module.css';

// const metaInfo = useMetaInfo('src/data/toml/schema/cron-expression.toml');

/**
 * cron parser:
 * 
 * - @vangware/cron - https://cron.vangware.com/
 * - cronstrue, @wolfpigeon/cronstrue
 * - @datasert/cronjs-parser - https://github.com/datasert/cronjs
 */

const DAY_FIELD = 'day_of_month';
const WEEK_FIELD = 'day_of_week';
const MONTH_FIELD = 'month';

const FIELDS = ['second', 'minute', 'hour', DAY_FIELD, MONTH_FIELD, WEEK_FIELD, 'year'];

// Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday
const WEEK_DAYS = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]; // metaInfo[WEEK_FIELD]['names'];

// January, February, March, April, May, June, July, August, September, October, November, December
const MONTH_NAMES = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]; // metaInfo[MONTH_FIELD]['names'];

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
    const { expressions: [parsed] } = parseCron(expression.trim(), { hasSeconds: true });
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
            if (field === DAY_FIELD) {   // day_of_month
                const result = [];
                if (Array.isArray(part.values)) {
                    part.values.forEach(number => {
                        result.push(descMonth(number));
                    });
                }
                if (Array.isArray(part.nearestWeekdays)) {
                    part.nearestWeekdays.forEach(weekday => {
                        result.push(`the weekday nearest day ${descIndex(weekday)}`);
                    });
                }
                return `${join(result)} of the month`;
            }
            if (field === WEEK_FIELD) {   // day_of_week
                const result = [];
                if (Array.isArray(part.values)) {
                    part.values.forEach(number => {
                        result.push(descWeekday(number));
                    });
                }
                if (Array.isArray(part.ranges)) {
                    part.ranges.forEach(range => {
                        result.push(`${descWeekday(range.from)} through ${descWeekday(range.to)}`);
                    });
                }
                if (Array.isArray(part.lastDays)) {
                    part.lastDays.forEach(number => {
                        result.push(`last ${descWeekday(number)}`);
                    });
                }
                if (Array.isArray(part.nthDays)) {
                    part.nthDays.forEach(({ day_of_week, instance }) => {
                        result.push(`${descIndex(instance)} ${descWeekday(day_of_week)}`);
                    });
                }
                return `${join(result)} of the month`;
            }
            const result = [];
            if (Array.isArray(part.steps)) {
                part.steps.forEach(({ from, to, step }) => {
                    result.push(`at ${descIndex(from)} through ${descIndex(to)}, every ${step} ${field}s`);
                });
            }
            if (Array.isArray(part.ranges)) {
                part.ranges.forEach(range => {
                    result.push(`at ${descIndex(range.from)} through ${descIndex(range.to)}`);
                });
            }
            if (Array.isArray(part.values)) {
                part.values.forEach(value => {
                    if (index === 4) {   // 月份 
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
    useDocumentTitle('Cron 表达式');
    const [expression, setExpression] = useState('1-2/3 1-2,3,4 * 2W SEP,OCT 1L */10');
    const converted = useMemo(() => {
        const parts = expression.trim().split(/\s+/);
        try {
            const { details, parsed } = resolve(expression.trim());
            return { parts, details, rows: FIELDS.map(field => JSON.stringify(parsed[field])) };
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
            <DataFrame type="inline" data={[FIELDS.map(field => field.replaceAll('_', ' ')), converted.parts, converted.details, converted.rows]} />
            <h3>References</h3>
            <ol>
                <li>
                    <a href="https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm" target="_blank">Oracle® Role Manager Integration Guide - A Cron Expressions</a>
                </li>
                <li>
                    <a href="https://github.com/datasert/cronjs" target="_blank">@datasert/cronjs-parser</a>
                </li>
            </ol>
        </div>
    );
};