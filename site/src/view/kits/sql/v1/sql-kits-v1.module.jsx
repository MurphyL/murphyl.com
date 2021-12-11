import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import classNames from "classnames";
import { format as formatSQL } from '@sqltools/formatter';

import { useDocumentTitle } from 'plug/hooks';

import { CodeEditor } from 'plug/extra/source-code/source-code.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';
import { Button, Label, Select } from 'plug/extra/form-item/form-item.module';

import styles from './sql-kits-v1.module.css';

const SQLFormatter = () => {
    useDocumentTitle('SQL 格式化');
    const [sql, setSQL] = useState('select 1 from dual');
    const [wordCase, setWordCase] = useState('null');
    const format = () => {
        setSQL(formatSQL(sql, {
            language: 'language',
            indent: '    ',
            reservedWordCase: wordCase,
            linesBetweenQueries: 3,
        }));
    };
    return (
        <div className={styles.formatter}>
            <CodeEditor language="sql" value={sql} onChange={setSQL} />
            <DriftToolbar>
                <Button onClick={format}>Beautify</Button>
                <Label>Convert keywords to</Label>
                <Select onChange={setWordCase}>
                    <option value="null">Preserve</option>
                    <option value="upper">UpperCase</option>
                    <option value="lower">LowerCase</option>
                </Select>
            </DriftToolbar>
        </div>
    );
};

const SQLSnippet = () => {
    useDocumentTitle('SQL 代码片段');
    return (
        <div></div>
    );
};

const SQLManual = () => {
    useDocumentTitle('SQL 帮助文档');
    return (
        <div></div>
    );
};

const PATHNAME_PREFIX = 'sql/v1';

const SQL_KITS_NAVI = [{
    path: `./${PATHNAME_PREFIX}`,
    name: 'SQL 格式化',
}, {
    path: `./${PATHNAME_PREFIX}/snippet`,
    name: 'SQL 代码片段',
}, {
    path: `./${PATHNAME_PREFIX}/manual`,
    name: 'SQL 帮助文档',
}];

const SQLKitsLayout = () => {
    const { setNaviItems } = useOutletContext();
    useEffect(() => {
        setNaviItems(SQL_KITS_NAVI);
    }, []);
    return (
        <div className={styles.root}>
            <Outlet />
        </div>
    );
};

SQLKitsLayout.displayName = 'SQLKits.Layout@v1';

export default {
    path: PATHNAME_PREFIX,
    element: <SQLKitsLayout />,
    children: [{
        index: true,
        element: <SQLFormatter />
    }, {
        path: 'snippet',
        element: <SQLSnippet />
    }, {
        path: 'manual',
        element: <SQLManual />
    }]
};