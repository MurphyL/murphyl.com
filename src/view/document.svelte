<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Split from 'split.js'

    import TreeView from '../plug/tree-view.svelte';

    let instance;
    
    onMount(() => {
        if(!instance) {
            return;
        }
        Split(instance.children, {
            minSize: 200,
            sizes: [15, 85],
            gutterSize: 3,
        })
    });

</script>

{#await axios.get('/docs/build.json')}
    <div>loading</div>
{:then {data}} 
    <div class="docs" bind:this={instance}>
        <div class="navi">
            <TreeView {data} />
        </div>
        <div class="board"></div>
    </div>
{/await}

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
    }
    .docs :global(.gutter-horizontal) {
        background-color: #efefef;
        cursor: col-resize;
    }
</style>