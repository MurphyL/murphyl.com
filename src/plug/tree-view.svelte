<script>
    export let data = [];

    export let expandAll = false;

    const expand = ({ target }) => {
        target.parentNode.nextElementSibling.classList.toggle('hide');
    };
</script>

<div class="tree-view">
    {#each data as { name, children }}
        <div class="node">
            <div class="content">
                {#if children}
                    <span class="trigger" on:click={expand}>x</span>
                {/if}
                <span class="text">{name}</span>
            </div>
            <div class="children" class:hide={!expandAll}>
                {#if children}
                    <svelte:self data={children} />
                {/if}
            </div>
        </div>
    {:else}
        <div>暂无数据</div>
    {/each}
</div>

<style>
    .tree-view {
        margin: 5px;
    }
    .tree-view .node .content {
        cursor: pointer;
        user-select: none;
    }
    .tree-view .node .content .trigger {
        display: inline-block;
    }
    .tree-view .node .hide {
        display: none;
    }
</style>
