import { Fragment } from 'react';

import Header from '../../include/header/header.include.jsx';
import Footer from '../../include/footer/footer.include.jsx';

import layout from '../layout.module.css';
import styles from './portal.module.css';

export default function Portal({ children }) {
    return (
        <Fragment>
            <Header></Header>
            <main className={`${layout.root} ${styles.root}`}>{ children }</main>
            <Footer></Footer>
        </Fragment>
        
    )
};