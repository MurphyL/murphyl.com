import { useState } from "react";

import classNames from "classnames";
import durationFormat from 'format-duration';

import { NaviTabs } from "plug/dynamic/tabs/dynamic-tabs.module";
import { DynamicTable } from "plug/dynamic/table/dynamic-table.module";

import styles from './expression.module.css';

const ms = x => x * 1000;

const formatDuration = (hours, minutes, seconds) => {
    if(isNaN(hours) || Number(hours) > 23 || Number(hours) < 0) {
        return '小时数据错误';
    }
    if(isNaN(minutes) || Number(minutes) > 59 || Number(minutes) < 0) {
        return '分钟数据错误';
    }
    if(isNaN(seconds) || Number(seconds) > 59 || Number(seconds) < 0) {
        return '秒数数据错误';
    }
    return durationFormat(ms(hours * 60 * 60) + ms(minutes * 60) + ms(seconds), { leading: true });
};

function CronExpressionMaker() {
    const [ expr, setExpr ] = useState('0 0 1 * * ? *');
    const parts = expr.trim().split(/\s/);
    const desc = () => {
        if(parts.length !== 7) {
            return setExpr('解析表达式错误');
        }
        const time = formatDuration(parts[2], parts[1], parts[0]);
        return `${time}`;
    };
    const fileds = [ 'second', 'minute', 'hour', 'day', 'month', 'week', 'year' ];
    const values = [Object.fromEntries(fileds.map((part, index) => ([ part,  parts[index]])))];
    return (
        <div className={classNames(styles.kit, styles.maker, styles.cron)}>
            <div>
                <label htmlFor="cron-input">Cron Expression:</label>
                <input type="text" id="cron-input" defaultValue={expr} onChange={e => setExpr(e.target.value)} />
            </div>
            <div>
                <div>Cron Expression Description</div>
                <div>
                    <span>{desc(expr)}</span>
                </div>
            </div>
            <div>
                <div>Parsing Details</div>
                <DynamicTable columns={fileds.map((part) => ({ name: part }))} data={values} hideHeaders={false} nullValuePlaceholder='-' />
            </div>
            <ul>
                <li>
                    <a href="https://www.jstoolset.com/cron" target="_blank">JSToolSet - Cron Parser</a>
                </li>
            </ul>
        </div>
    );
}

// 表达式
// - https://www.jstoolset.com/cron
// - https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm
export default function Expression() {
    return (
        <NaviTabs>
            <CronExpressionMaker name="CRON 表达式编辑器" />
        </NaviTabs>
    );
}