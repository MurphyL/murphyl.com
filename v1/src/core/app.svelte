<script>
    import {Route} from 'tinro'; 

    import Home from '../view/home.svelte';
    import Blog from '../view/blog.svelte';
    import Docs from '../view/docs.svelte';
    import Group from '../view/group.svelte';

    import SQL from '../view/data/sql.svelte';

    import LinkTable from '../view/extra/link_table.svelte';
    import CryptoApp from '../view/extra/crypto_utils.svelte';

    import ExtraTable from '../view/extra/extra_table.svelte';

    import StatusCode from '../view/extra/status_code.svelte';


    import MacOS from '../view/system/macos.svelte';
    import Windows10 from '../view/system/windows10.svelte';
    import WinApps from '../view/extra/win_apps.svelte';
</script>

<Route>
    <Route path="/">
        <Home />
    </Route>
    <Route path="/blog">
        <Blog />
    </Route>
    <Route path="/docs">
        <Docs />
    </Route>
    <Route path="/spec">
        <div>spec</div>
    </Route>
    <Route path="/data/*">
        <Route path="/">
            <SQL />
        </Route>
    </Route>
    <Route path="/group/*" >
        <Route path="/">
            <Group name="/" />
        </Route>
        <Route path="/:group" let:meta>
            <Group name={meta.params.group} />
        </Route>
    </Route>
    <Route path="/extra/*">
        <Route path="/">
            <ExtraTable />
        </Route>
        <Route path="/http/*">
            <Route path="/status_code">
                <StatusCode/>
            </Route>
        </Route>
        <Route path="/crypto">
            <CryptoApp />
        </Route>
        <Route path="/links">
            <LinkTable />
        </Route>
        <Route path="/win10">
            <Windows10 />
        </Route>
        <Route path="/windows/*">
            <Route path="/apps">
                <WinApps />
            </Route>
        </Route>
        <Route path="/macos">
            <MacOS />
        </Route>
    </Route>
    <Route fallback>NOT FOUND</Route>
</Route>