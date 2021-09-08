<script>

    import simpleicons from 'simple-icons';

    const icons = [{
        text: 'Microsoft ToDo',
        icon: 'todoist'
    }, {
        text: 'Markdown',
        icon: 'markdown'
    }];

    const path = (slug) => (simpleicons.get(slug) || {}).path;
</script>


<svelte:head>
    <title>Windows 10</title>
</svelte:head>

<div class="windows10">
    <div class="desktop">
        <div class="icons">
            {#each icons as { icon, text }, index}
                <div class="icon" data-index={index}>
                    <svg viewBox="0 0 24 24" width="35px" height="35px">
                        <path d={path(icon)}/>
                    </svg>
                    <div>{text}</div>
                </div>
            {/each}
        </div>
        <div class="taskbar"></div>
    </div>
</div>


<style>
    :global(body), 
    .windows10,
    .windows10 .desktop {
        margin: 0;
        height: 100%;
    }

    .windows10 .desktop .icons {
        display: flex;
        flex-direction: column;
        height: calc(100% - 40px);
    }

    .windows10 .desktop .icons .icon {
        width: 65px;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        text-align: center;
        user-select: none;
        transform: scale(0.9);
        cursor: pointer;
    }
    .windows10 .desktop .icons .icon:hover {
        opacity: 0.6;
    }

    .windows10 .desktop .taskbar {
        height: 40px;
    }
</style>
