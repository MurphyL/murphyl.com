<script>
    export let data = [];

    export let expandAll = false;

    const expand = ({ target }) => {
        target.parentNode.nextElementSibling.classList.toggle('hide');
    };
</script>


{#each data as { name, children }}
    <div class="node">
        <div class="content">
            <span class="toggle" class:wrap={children} on:click={expand} />
            <span class="title">{name}</span>
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

<style>
    .node .content {
        cursor: pointer;
        user-select: none;
    }
    .node .content .toggle {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
    }
    .node .content .toggle:before {
        display: inline-block;
        content: "";
        width: 15px;
        height: 15px;
        vertical-align: middle;
    }
    .node .content .toggle:global(.wrap):before {
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23aaa%22%20d%3D%22M4%201h16q1.242%200%202.121%200.879t0.879%202.121v16q0%201.242-0.879%202.121t-2.121%200.879h-16q-1.242%200-2.121-0.879t-0.879-2.121v-16q0-1.242%200.879-2.121t2.121-0.879zM20%203h-16q-0.414%200-0.707%200.293t-0.293%200.707v16q0%200.414%200.293%200.707t0.707%200.293h16q0.414%200%200.707-0.293t0.293-0.707v-16q0-0.414-0.293-0.707t-0.707-0.293zM12%207q0.414%200%200.707%200.293t0.293%200.707v3h3q0.414%200%200.707%200.293t0.293%200.707-0.293%200.707-0.707%200.293h-3v3q0%200.414-0.293%200.707t-0.707%200.293-0.707-0.293-0.293-0.707v-3h-3q-0.414%200-0.707-0.293t-0.293-0.707%200.293-0.707%200.707-0.293h3v-3q0-0.414%200.293-0.707t0.707-0.293z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
    }
    .node .content .title {
        display: inline-block;
        line-height: 25px;
    }
    .node .hide {
        display: none;
    }
    .node>.children {
        margin-left: 15px;
    }
</style>
