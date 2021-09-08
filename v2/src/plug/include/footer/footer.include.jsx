import styles from './footer.module.css';

export default function Footer({ children }) {
    return (
        <footer className={styles.root}>
            <div>{ children }</div>
            <div className={styles.sign}>Footer</div>
        </footer>
    );
}