<script>
    import {Route} from 'tinro'; 

    import NavWrap from '../../plug/nav-wrap/nav-wrap.svelte';

    import StatusCodeTable from './extra/status_code_table.svelte';
</script>

<Route path="/http/*">
    <Route path="/status_code">
        <NavWrap>
            <StatusCodeTable />
        </NavWrap>
    </Route>
</Route>