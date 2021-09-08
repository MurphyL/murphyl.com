<script>
    import mapping from '../../json/http/status_code.json';
</script>


<table class="http-status">
    <thead>
        <th class="code">状态码</th>
        <th class="desc">含义</th>
    </thead>
    <tbody>
        {#each Object.entries(mapping) as [code, desc], ri}
            <tr data-row-index={ri}>
                <td class="code">{code}</td>
                <td class="desc">{desc}</td>
            </tr>
        {/each}
    </tbody>
</table>


<style>
    .http-status {
        margin: 10px 20px 20px;
    }
    .http-status .code {
        width: 120px;
        text-align: center;
    }
</style>
