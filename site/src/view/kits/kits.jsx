import { useEffect } from 'react';

import { Outlet, useOutletContext } from "react-router-dom";

import IconKits from './icons/icon-kits.module';

import Snippets from './snippets/snippet-kits.module';

// text
import TimeKits from './text/time/time-kits.module';
import TOMLEditor from './text/toml/toml-kits.module';
import TextCrypto from './text/crypto/crypto-kits.module';
import Translator from './text/translator/translator.module';
import TextDifference from './text/difference/text-difference.module';

// expr
import CronExpressionKit from './text/cron/cron-expression-v1.module';
import ScoopCommandKit from './text/cli/scoop/scoop-cli.module';

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
            name: 'DateTime Kit',
            path: './text/datetime',
        }, {
            name: 'Simple Icons',
            path: './icon',
        }, {
            name: 'Snippets',
            path: './snippet',
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
            path: 'datetime',
            element: <TimeKits />
        }, {
            path: 'translator',
            element: <Translator />
        }]
    }, {
        path: 'expression',
        children: [{
            path: 'cron/v1',
            element: <CronExpressionKit />
        }, {
            path: 'scoop/cli',
            element: <ScoopCommandKit />
        }]
    }, {
        path: 'snippet',
        element: <Snippets />
    }, {
        path: 'icon',
        element: <IconKits />
    }, {
        path: '*',
        element: <div>no matched kit</div>
    }]
}