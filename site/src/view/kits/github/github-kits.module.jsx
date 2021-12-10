
import { Outlet } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';

import NaviLayout from "plug/layout/navi-layout/navi-layout.module";

import { Button, Label, TextInput } from 'plug/extra/form-item/form-item.module';

import styles from './github-kits.module.css';

const GH_KITS_NAVI = [{
    name: 'Prepared GraphQL',
    path: './'
}];

const PreparedGraphQL = () => {
    useDocumentTitle('Github 预定义查询');
    return (
        <div className={styles.graphql}>
            <div className={styles.toolbar}>
                <Label>设置选项：</Label>
                <TextInput />
                <Button>查询</Button>
            </div>
        </div>
    );
};


export function Layout() {
    useDocumentTitle('Github 工具集');
    return (
        <NaviLayout className={styles.root} items={GH_KITS_NAVI}>
            <Outlet />
        </NaviLayout>
    );
};

Layout.displayName = 'GithubKits.Layout@v1';

export const Routes = [{
    index: true,
    element: <PreparedGraphQL />
}];