<script>
    import BlogLayout from "../../plug/blog.layout.svelte";
    import axios from "axios";
</script>

{#await axios.get("/json/http/status_code.json")}
    <div>数据加载中</div>
{:then { data: mapping }}
    <BlogLayout>
        <table class="data-table">
            <thead>
                <th class="code">状态码</th>
                <th class="desc">含义</th>
            </thead>
            <tbody>
                {#each Object.entries(mapping) as [code, desc], ri}
                    <tr>
                        <td class="code">{code}</td>
                        <td class="desc">{desc}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </BlogLayout>
{/await}

<style>
    .data-table {
        width: 100%;
    }
    .data-table .code {
        width: 120px;
        text-align: center;
    }
</style>
