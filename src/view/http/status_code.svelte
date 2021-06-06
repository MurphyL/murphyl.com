<script>
    import axios from 'axios';
</script>

{#await axios.get('/json/http/status_code.json')}
    <div>数据加载中</div>
{:then { data: mapping }} 
<table class="data-table">
    <thead>
        <th>状态码</th>
        <th>含义</th>
    </thead>
    <tbody>
        {#each Object.entries(mapping) as [ code, desc ], ri}
            <tr>
                <td>{code}</td>
                <td>{desc}</td>
            </tr>
        {/each}
    </tbody>
</table>
{/await}
