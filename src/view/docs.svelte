<script>
    import TreeView from '../plug/tree-view.svelte';
</script>

<div class="docs">
    <div class="navi">
        <TreeView data={[{name: 'x', children: [{name: 'y', children: [{name: 'z'}]}]}] }/>
    </div>
    <div class="board"></div>
</div>

<style>
    :global(html), 
    :global(body),
    .docs,
    .docs .navi {
        margin: 0;
        height: 100%;
    }
    .docs {
        display: flex;
    }
    .docs .navi {
        width: 300px;
        border-right: 1px solid #efefef;
    }
</style>