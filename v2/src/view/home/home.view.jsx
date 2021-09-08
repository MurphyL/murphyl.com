import ProtalLayout from 'plug/layout/portal/portal.layout.jsx';

import styles from './home.module.css';

export default function Home() {
    return (
        <ProtalLayout>
            <div className={styles.root}>
                <span>Home</span>
            </div>
        </ProtalLayout>
    );
}