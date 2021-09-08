<script>
    import { children } from 'svelte/internal';
import { top } from '../navi';
    export let current = 'home';
</script>

<header class="header">
    <nav class="navbar fixed">
        <div class="inner">
            <div class="brand">
                <a href="/">{process.env.APP_TITLE}</a>
            </div>
            <div class="navi">
                {#each top as item}
                    {#if item.children}
                        <a class="item group" class:current={current === item.group} href={`/group/${item.group}`}>{item.label}</a>
                    {:else}
                        <a class="item" class:current={current === item.group} href={`/${item.group}`}>{item.label}</a>
                    {/if}
                    
                {/each}
            </div>
        </div>
    </nav>
</header>
<main class="content">
    <slot />
</main>
<footer class="footer">
    <center>@murph</center>
</footer>

<style>
    .header {
        -webkit-user-select: none;
        user-select: none;
    }
    .header .navbar {
        padding: 10px 15px;
    }
    .header .navbar a {
        text-decoration: none;
    }
    .header .navbar a:visited {
        color: #2c3e50;
    }
    .header .navbar.fixed {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #eaecef;
    }
    .header .navbar .inner {
        display: flex;
        height: 30px;
        line-height: 2rem;
    }
    .header .navbar .inner .brand {
        height: 2rem;
        font-size: 1.2rem;
        font-weight: 600;
    }
    .header .navbar .inner .navi {
        flex: 1;
        text-align: right;
    }
    .header .navbar .inner .navi .item {
        padding: 0 16px;
        cursor: pointer;
    }
    .header .navbar .inner .navi .item.group::after {
        content: '▾';
        color: grey;
    }
    .content {
        margin: 10px 0;
        min-height: 300px;
    }
    .footer {
        min-height: 120px;
        border-top: 1px solid #eaecef;
    }
</style>
