import { useState } from 'react';
import dayjs from 'dayjs';

import classNames from 'classnames';

import { TextInput } from 'plug/extra/form-item/form-item.module';

import styles from './time-kits.module.css';

export default function TimeKits() {
    const [ datetime, setDatetime ] = useState(dayjs());
    return (
        <div className={classNames(styles.root)}>
            <div>
                <div>
                    <TextInput value={datetime.format('YYYY/MM/DD')} type="datetime" onChange={value => setDatetime(dayjs(value))} />
                </div>
                <div>
                    <TextInput value={datetime.unix()} type="datetime" />
                </div>
            </div>
            <div>
                <fieldset>
                    <legend>Year/Month/Date</legend>
                    <TextInput value="YYYY" />
                    <TextInput value="MM" />
                    <TextInput value="DD" />
                </fieldset>
                <fieldset>
                    <legend>Hour/Minute/Second</legend>
                </fieldset>
                <fieldset>
                    <legend>Special</legend>
                </fieldset>
            </div>
        </div>
    );
}