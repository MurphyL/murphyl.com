<script>
    import {Route} from 'tinro'; 

    import Blog from '../view/blog/blog.svelte';
    import Docs from '../view/blog/docs.svelte';

    import LinkTable from '../view/link_table.svelte';

    import StatusCode from '../view/http/status_code.svelte';
    import CryptoTools from '../view/crypto_utils.svelte';


    import MacOS from '../view/system/macos.svelte';
    import Windows10 from '../view/system/windows10.svelte';
</script>

<Route>
    <Route path="/">
        <div>HOME</div>
    </Route>
    <Route path="/blog">
        <Blog />
    </Route>
    <Route path="/docs">
        <Docs />
    </Route>
    <Route path="/extra/*">
        <Route path="/http/*">
            <Route path="/status_code">
                <StatusCode/>
            </Route>
        </Route>
        <Route path="/crypto">
            <CryptoTools />
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