import { useMemo } from 'react';

import camelCase from 'camelcase';
import { pascalCase } from "pascal-case";

const TYPE_MAPPER = {
    integer: 'Integer',
    string: 'String',
};

export default function JavaBeanViewer({ schema = {} }) {
    const { title, description, required, properties } = schema;
    const code = useMemo(() => {
        const fields = Object.entries(properties).map(([property, { type, description }]) => {
            return [
                `/**`, ` * ${description}`, ` */`,
                `private ${TYPE_MAPPER[type] || type} ${camelCase(property)};`
            ].map(line => `    ${line}`).join('\n');
        });
        return [`/**`, ` * ${description}`, ` */`, `public class ${pascalCase(title)} {\n`, fields.join('\n\n'), '\n}'].join('\n');
    }, [title, required, properties]);
    return (
        <div>
            <pre>
                <code>
                    {code}
                </code>
            </pre>
        </div>
    );
};
