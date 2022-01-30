import { useState } from 'react';
import dayjs from 'dayjs';

import classNames from 'classnames';

import { TextInput } from 'plug/extra/form-item/v1/form-item-v1.module';

import TextField from '@mui/material/TextField';

import styles from './time-kits.module.css';

export default function TimeKits() {
    const [datetime, setDatetime] = useState(dayjs());
    return (
        <div className={classNames(styles.root)}>
            <div>
                <div>
                    <TextField id="basic-date" value={datetime.format('YYYY/MM/DD')} label="YYYY/MM/DD" variant="outlined" size="small" />
                </div>
                <div>
                    <TextField id="unix-timestamp" value={datetime.unix()} label="Unix TimeStamp" variant="outlined" size="small" />
                </div>
            </div>
            <div>
                <fieldset>
                    <legend>Formats</legend>
                </fieldset>
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