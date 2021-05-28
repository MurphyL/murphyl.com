<script>
    import NavItem from './extra/default-top-nav.svelte';
    import { top_bar } from '../../../public/json/navi.json';
</script>

<div class="nav-wrap">
    <div class="header">
        <div class="logo"></div>
        <div class="navi">
            {#each top_bar as item}
                <NavItem {item} />
            {/each}
        </div>
    </div>
    <slot />
</div>

<style>
    .nav-wrap .header {
        display: flex;
    }
    .nav-wrap .header .logo {
        width: 300px;
    }
    .nav-wrap .header .navi {
        margin-right: 10px;
        flex: 1;
        text-align: right;
    }
</style>