<script>
    import {Route} from 'tinro'; 

    import Docs from '../view/docs.svelte';

    import HttpRouter from '../view/http/http.svelte';
    import CryptoRouter from '../view/crypto/crypto.svelte';
</script>

<Route>
    <Route path="/">
        <div>HOME</div>
    </Route>
    <Route path="/docs/*">
        <Route path="/">
            <Docs />
        </Route>
    </Route>
    <Route path="/extra/*">
        <HttpRouter />
        <CryptoRouter />
    </Route>
    <Route fallback>NOT FOUND</Route>
</Route>