import { Fragment, useEffect, useMemo, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import classNames from "classnames";
import { useDocumentTitle } from 'plug/hooks';
import { Parser } from 'sql-ddl-to-json-schema';
import { format as formatSQL } from '@sqltools/formatter';

import { Splitter as SplitView } from "plug/components";

import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import { Dynamic } from 'plug/extra/status/status.module';
import { CodeEditor, JSONViewer } from 'plug/components';
import { Button, Label, Select as SelectV1 } from 'plug/extra/form-item/v1/form-item-v1.module';

import { Modal, Select } from 'plug/components';

import IssueSchema from "plug/github/issue/issue-schema/issue-schema.module";

import JavaBeanViewer from '../ddl-schema/java-bean/ddl-schema2java-bean.module';

import styles from './sql-kits-v1.module.css';

const MYSQL_DDL_PARSER = new Parser('mysql');

const DDL_PARSER_OPTIONS = { useRef: false };

export const SQLFormatter = () => {
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
        <div className={styles.editor}>
            <CodeEditor language="sql" value={sql} onChange={setSQL} />
            <DriftToolbar>
                <Button onClick={format}>Beautify</Button>
                <Label>Convert keywords to</Label>
                <SelectV1 onChange={setWordCase}>
                    <option value="null">Preserve</option>
                    <option value="upper">UpperCase</option>
                    <option value="lower">LowerCase</option>
                </SelectV1>
            </DriftToolbar>
        </div>
    );
};

const DEMO_DDL=`
CREATE TABLE demo_table (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    status tinyint(1) DEFAULT '1' COMMENT '有效标志',
    create_time datetime DEFAULT NULL COMMENT '创建时间',
    update_time datetime DEFAULT NULL COMMENT '更新时间',
    ts timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
    PRIMARY KEY (id)
) COMMENT='DEMO Table';
`;


const DEFAULT_RENDER = 'java/bean';

const SCHEMA_RENDERS = Object.entries({
    'java/bean': 'Java Bean',
    'json/object': 'JSON Object',
});

const DDLSchema = () => {
    useDocumentTitle('DDL Schema');
    const [ddls, setDDLs] = useState(DEMO_DDL);
    const [mode, setMode] = useState(DEFAULT_RENDER);
    const [show, setShow] = useState(false);
    const [ schema ] = useMemo(() => {
        return MYSQL_DDL_PARSER.feed(ddls).toJsonSchemaArray(DDL_PARSER_OPTIONS);
    }, [ddls]);
    return (
        <Fragment>
            <SplitView sizes={[60, 40]} gutterSize={5}>
                <div className={styles.editor}>
                    <CodeEditor language="sql" value={ddls} onChange={setDDLs} />
                </div>
                <div className={classNames(styles.board)}>
                    <JSONViewer name="DDL" value={schema} />
                    <DriftToolbar postion="rb">
                        <Button onClick={() => setShow(true)}>Show</Button>
                        <Select defaultValue={mode} onChange={value => {setMode(value);}}>
                            {SCHEMA_RENDERS.map(([value, label], index) => (
                                <option key={index} value={value}>{label}</option>
                            ))}
                        </Select>
                    </DriftToolbar>
                </div>
            </SplitView>
            <Modal open={show} title="展示 Schema" onClose={() => setShow(false)}>
                <JavaBeanViewer schema={ schema } />
            </Modal>
        </Fragment>
    );
};

const SQLSnippet = () => {
    useDocumentTitle('SQL 代码片段');
    return (
        <Dynamic>
            <IssueSchema label="X-SQL" unique="snippet" />
        </Dynamic>
    );
};

const SQLManual = () => {
    useDocumentTitle('SQL 帮助文档');
    return (
        <Dynamic>
            <IssueSchema label="X-SQL" unique="manual" />
        </Dynamic>
    );
};

const PATHNAME_PREFIX = 'sql/v1';

export const SQL_KITS_NAVI = [{
    path: `./${PATHNAME_PREFIX}/`,
    name: 'SQL Formatter',
}, {
    path: `./${PATHNAME_PREFIX}/ddl/schema`,
    name: 'DDL Schema',
}, {
    path: `./${PATHNAME_PREFIX}/snippet`,
    name: 'SQL Snippet',
}, {
    path: `./${PATHNAME_PREFIX}/manual`,
    name: 'SQL Manual',
}];

const SQLKitsLayout = () => {
    const { setNaviItems } = useOutletContext();
    useEffect(() => {
        setNaviItems(SQL_KITS_NAVI);
    }, []);
    return (
        <Outlet />
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
        path: 'ddl/schema',
        element: <DDLSchema />
    }, {
        path: 'snippet',
        element: <SQLSnippet />
    }, {
        path: 'manual',
        element: <SQLManual />
    }]
};