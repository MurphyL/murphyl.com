<script>
    import {Route} from 'tinro'; 

    import Home from '../view/home.svelte';
    import Blog from '../view/blog.svelte';
    import Docs from '../view/docs.svelte';
    import Kits from '../view/kits.svelte';

    import SQL from '../view/data/sql.svelte';

    import LinkTable from '../view/extra/link_table.svelte';

    import StatusCode from '../view/extra/status_code.svelte';


    import MacOS from '../view/system/macos.svelte';
    import Windows10 from '../view/system/windows10.svelte';
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
    <Route path="/kits">
        <Kits />
    </Route>
    <Route path="/spec">
        <div>spec</div>
    </Route>
    <Route path="/db/*">
        <Route path="/">
            <SQL />
        </Route>
    </Route>
    <Route path="/extra/*">
        <Route path="/http/*">
            <Route path="/status_code">
                <StatusCode/>
            </Route>
        </Route>
        <Route path="/links">
            <LinkTable />
        </Route>
        <Route path="/win10">
            <Windows10 />
        </Route>
        <Route path="/macos">
            <MacOS />
        </Route>
    </Route>
    <Route fallback>NOT FOUND</Route>
</Route>