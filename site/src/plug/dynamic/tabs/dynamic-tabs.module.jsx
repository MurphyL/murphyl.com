import React, { Children, useState } from "react";

import classNames from "classnames";


import styles from './dynamic-tabs.module.css';

export default function Tabs({ children, type = 'default', selected: current = 0 }) {
    const [selected, setSelected] = useState(current);
    const tabs = Children.toArray(children);
    return (
        <div className={classNames(styles.root, styles[type])}>
            <div className={styles.keys}>
                {tabs.map((child, index) => (
                    <div key={index} className={classNames(styles.key, { [styles.selected]: selected === index })} onClick={() => setSelected(index)}>
                        {child.props.name || `Tab ${index + 1}`}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                {tabs[selected]}
            </div>
        </div>
    );
}