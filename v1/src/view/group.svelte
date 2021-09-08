<script>
import { children } from 'svelte/internal';

    import { top } from '../navi';
    import BlogLayout from '../plug/blog.layout.svelte';

    export let name = 'kits';
</script>

<BlogLayout>
    {#each ((top || []).filter(item => name === '/' ? item.children : (item.group === name))) as item, index}
        <dl class="group" data-index={index}>
            {#if item.page}
                <dt>
                    <a href={`/${item.group}`}>{item.label}</a>
                </dt>
            {/if}
            <dd data-group={item.group} data-index={index}>
                {#each (item.children || []) as x, i}
                    <div data-index={i}>
                        {#if x.link}
                            <a href={x.link}>{x.label}</a>
                        {:else}
                            <span>{x.label}</span>
                        {/if}
                    </div>
                {/each}
            </dd>
        </dl>
    {/each}
</BlogLayout>

<style>
    .group {
        margin: 0 auto;
        width: 960px;
    }
</style>