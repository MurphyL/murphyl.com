
import { useState } from 'react';

import classNames from 'classnames';

import { useDocumentTitle } from 'plug/hooks';

import { Checkbox, Label, Select, TextInput } from 'plug/extra/form-item/v1/form-item-v1.module';
import { CodeBlock } from 'plug/components';

import styles from './scoop-cli.module.css';

// https://archive.cloudera.com/cdh/3/sqoop/SqoopUserGuide.html
const OPTIONS = {
    '$': {
        '--connect': {
            display: 'JDBC connect string',
            default: 'jdbc:mysql://localhost/db',
            sort: 10
        },
        '--driver': {
            display: 'JDBC driver class',
            default: 'jdbc:mysql://localhost/db',
            sort: 20,
            optional: true

        },
        '--username': {
            display: 'Authentication username',
            sort: 40
        },
        '--password': {
            display: 'Authentication password',
            sort: 50
        },
        '--verbose': {
            display: 'Verbose',
            sort: 60,
            optional: true
        },
    },
    RDBMS: {
        '--table': {
            display: 'Table',
        }
    },
    Hive: {
        '--hadoop-home': {
            display: '$HADOOP_HOME',
            default: 'jdbc:mysql://localhost/db',
            sort: 30
        },
        '--as-avrodatafile': {
            exists: false,
        },
        '--as-sequencefile': {
            exists: false,
        },
        '--as-textfile': {
            exists: false,
        },
        '--as-num-mappers': {
            
        },
        '--hive-home': {
            exists: false,
        },
        '--hive-import': {
            
        },
        '--hive-overwrite': {
            exists: false,
        },
        '--create-hive-table': {
            exists: false,
        },
        '--hive-table': {
            
        },
        '--hive-drop-import-delims': {
            exists: true,
        },
        '--hive-partition-key': {
            
        },
        '--hive-partition-value': {
            
        },
        '--hive-column-hive': {
            
        },
    }
};

const ENDPOINTS = {
    RDBMS: {
        '--table': {
            display: 'Table',
        }
    },
    Hive: {

    },
    HDFS: {
        '': { display: '' },
    }
};

const RULES = [
    ['RDBMS', 'Hive'],
    ['RDBMS', 'HDFS'],
];

const ACTIONS = ['import', 'export'];

const joinOptions = (options) => Object.entries(options).map(([key, item]) => `${key} ${item.value}`).join(' ');

const convert = ([action, reader, writer], commonOption, readerOption, writerOption) => {
    return [
        `scoop ${action}`,
        `${joinOptions(commonOption)}`,
        `${joinOptions(readerOption)}`,
        `${joinOptions(writerOption)}`
    ].join(' \\\n\t');
};

export default function ScoopCLI() {
    useDocumentTitle('Scoop 命令行');
    const [rule, setRule] = useState([ACTIONS[0], ...RULES[0]]);
    const commonOption = useState({ '--verbose': { value: false } });
    const readerOption = useState({});
    const writerOption = useState({});
    const optionObject = useState({
        '--connect': {
            display: 'JDBC connect string',
            default: 'jdbc:mysql://localhost/db',
            sort: 10

        },
        '--driver': {
            display: 'JDBC driver class',
            default: 'jdbc:mysql://localhost/db',
            sort: 20,
            optional: true

        },
        '--hadoop-home': {
            display: '$HADOOP_HOME',
            default: 'jdbc:mysql://localhost/db',
            sort: 30
        },
        '--username': {
            display: 'Authentication username',
            sort: 40
        },
        '--password': {
            display: 'Authentication password',
            sort: 50
        },
        '--verbose': {
            display: 'Verbose',
            sort: 60,
            optional: true
        },
    });
    const options = [readerOption, writerOption];
    const onOptionChange = ([values, setter], key, value, options) => {
        setter({ ...values, [key]: { value, ...options } });
    };
    return (
        <div className={styles.root}>
            <div className={styles.settings}>
                {/** TODO: 抽象 Select 模块 */}
                <Label>
                    <span>选项：</span>
                    <Select onChange={selected => setRule(selected.split(','))}>
                        {ACTIONS.map((action, index) => (
                            <optgroup key={index} label="Import">
                                {RULES.map((item, ri) => (
                                    <option key={ri} value={[action, ...item]}>{item.join(' -> ')}</option>
                                ))}
                            </optgroup>
                        ))}
                    </Select>
                </Label>
                <Label>
                    <span>Verbose：</span>
                    <Checkbox value={commonOption[0]['--verbose'].value} onChange={value => { onOptionChange(commonOption, '--verbose', value, {}) }} />
                </Label>
            </div>
            <div className={styles.board}>
                {[rule[1], rule[2]].map((endpoint, ei) => (
                    <fieldset key={ei} className={classNames(styles.rule_options, styles.reader_rule)}>
                        <legend>{ACTIONS[ei]}{ei > 0 ? ` - ${endpoint}` : ''}</legend>
                        {Object.entries(ENDPOINTS[endpoint]).map(([fieldKey, fieldOption], fi) => (
                            <Label key={fi}>
                                <span>{fieldOption.display}</span>
                                <TextInput name={fieldKey} onChange={value => { onOptionChange(options[ei], fieldKey, value, fieldOption) }} />
                            </Label>
                        ))}
                    </fieldset>
                ))}
            </div>
            <div className={styles.command}>
                <CodeBlock language="shell" value={convert(rule, commonOption[0], readerOption[0], writerOption[0])} />
            </div>
        </div>
    );
}