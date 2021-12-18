import { useEffect } from 'react';

import { Outlet, useOutletContext } from "react-router-dom";

// text
import TOMLEditor from './text/toml/toml-kits.module';
import TextCrypto from './text/crypto/crypto-kits.module';
import Time2Text from './text/time/time-text.module';
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
            name: 'DateTime Formatter',
            path: './text/time/converter',
        }, {
            name: 'JSONPath Query',
            path: './json/v1/path-query',
        }, {
            name: 'SQL Formatter',
            path: './sql/v1',
        }]);
    }, [ setNaviItems ]);
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
        }, {
            path: 'time/converter',
            element: <Time2Text />
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