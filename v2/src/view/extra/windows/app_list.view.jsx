import { Fragment } from 'react';
import styles from './app_list.module.css';

import apps from 'data/extra/windows_app_list.json';

export default function WindowsAppList() {
    return (
        <div className={styles.root}>
            <dl>
                {(apps || []).map((group, gi) => (
                    <Fragment key={gi}>
                        <dt id={`group-${gi + 1}`}>{group.label || '未命名'}</dt>
                        <dd>
                            <ul>
                                {(group.children || []).map((app, ai) => (
                                    <li key={ai}>
                                        { app.link ? (
                                            <a href={app.link} target="_blank">{app.label || "未命名"}</a>
                                        ) : (
                                            <span>{app.label || "未命名"}</span>
                                        ) }
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </Fragment>
                ))}

            </dl>
        </div>
    );
}