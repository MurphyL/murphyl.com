import { useState } from 'react';

import * as simpleicons from '@icons-pack/react-simple-icons';

import { TextInput } from 'plug/extra/form-item/v1/form-item-v1.module';

import styles from './icon-kits.module.css';

export default function IconKits() {
    const [ icons, setIcons ] = useState(Object.keys(simpleicons));
    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <TextInput onChange={value => { setIcons(Object.keys(simpleicons).filter(name => name.toLowerCase().indexOf(value.toLowerCase()) >= 0)); }} />
            </div>
            <div className={styles.main}>
                {icons.map((icon, index) => {
                    const Icon = simpleicons[icon];
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.icon}>
                                <Icon />
                            </div>
                            <div className={styles.title}>
                                {icon}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}