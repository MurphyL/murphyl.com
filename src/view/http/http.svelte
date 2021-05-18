<script>
    import {Route} from 'tinro'; 

    import StatusCodeTable from './extra/status_code_table.svelte';
</script>

<Route path="/http/*">
    <Route path="/status_code">
        <StatusCodeTable />
    </Route>
</Route>