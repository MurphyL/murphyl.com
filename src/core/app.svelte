<script>
    import {Route} from 'tinro'; 

    import NavWrap from '../plug/nav-wrap/nav-wrap.svelte';

    import Document from '../view/document.svelte';

    import HttpRouter from '../view/http/http.svelte';
    import CryptoRouter from '../view/crypto/crypto.svelte';

    import LinkTable from '../view/link_table.svelte';

    import MacOS from '../view/system/macos.svelte';
    import Windows10 from '../view/system/windows10.svelte';
</script>

<Route>
    <Route path="/">
        <div>HOME</div>
    </Route>
    <Route path="/docs/*">
        <Route path="/">
            <Document />
        </Route>
    </Route>
    <Route path="/extra/*">
        <HttpRouter />
        <CryptoRouter />
        <Route path="/links">
            <NavWrap>
                <LinkTable />
            </NavWrap>
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