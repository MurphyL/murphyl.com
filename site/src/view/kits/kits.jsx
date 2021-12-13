import { useEffect } from 'react';

import { Outlet, useOutletContext } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';

// text
import TOMLEditor from './text/toml/toml-kits.module';
import TextCrypto from './text/crypto/crypto-kits.module';
import TextDifference from './text/difference/text-difference.module';

// expr
import CronExpressionKit from './expression/cron/cron-expression-v1.module';
import ScoopCLIMaker from './expression/cli/scoop/scoop-cli-maker.module';

const KitList = () => {
    return (
        <div>all kits</div>
    );
}

const KitsLayout = () => {
    useDocumentTitle('所有工具');
    const { setNaviItems } = useOutletContext();
    useEffect(() => {
        setNaviItems([{
            name: 'TOML Editor',
            path: './toml/editor',
        }, {
            name: 'Text Difference',
            path: './text/difference',
        }, {
            name: 'Cron Expression',
            path: './expression/cron/v1',
        }, {
            name: 'Scoop CLI Maker',
            path: './expression/scoop/cli',
        }, {
            name: 'JSONPath Query',
            path: './json/v1/path-query',
        }, {
            name: 'SQL Formatter',
            path: './sql/v1',
        }]);
    }, []);
    return (
        <Outlet />
    );
};

KitsLayout.displayName = 'KitsLayout@v1';

export default {
    element: <KitsLayout />,
    children: [{
        index: true,
        element: <KitList />
    }, {
        path: 'toml/editor',
        element: <TOMLEditor />
    }, {
        path: 'text',
        children: [{
            path: 'difference',
            element: <TextDifference />
        }, {
            path: 'crypter',
            element: <TextCrypto />
        }]
    }, {
        path: 'expression',
        children: [{
            path: 'cron/v1',
            element: <CronExpressionKit />
        }, {
            path: 'scoop/cli',
            element: <ScoopCLIMaker />
        }]
    }, {
        path: '*',
        element: <div>no matched kit</div>
    }]
}