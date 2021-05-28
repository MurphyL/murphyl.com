<script>
    export let item = {};
</script>

<div class="navi-item">
    <div class="text">
        {#if item.url}
            <a href={item.url || "/"}>{item.label || "未命名"}</a>
        {:else}
            <span>{item.label || "未命名"}</span>
        {/if}
        
    </div>
    <div class="children">
        {#each (item.children || []) as child}
            <svelte:self item={child} />
        {/each}
    </div>
</div>

<style>
    .navi-item {
        display: inline-block;
        position: relative;
        padding: 5px 10px;
        line-height: 23px;
    }
    .navi-item>.children {
        display: none;
        position: absolute;
        right: 0;
        white-space: nowrap;
        word-break: break-all;
    }
    .navi-item:global(:hover)>.children {
        display: block;
    }
</style>
