<script>
    export let current = 'home';
</script>

<header>
    <nav class="navbar fixed">
        <div class="inner">
            <div class="brand">
                <a href="/">咖啡薄荷</a>
            </div>
            <div class="navi">
                <a href="/docs" class:current={current === 'docs'}>文档</a>
                <a href="/blog" class:current={current === 'blog'}>Blog</a>
                <a href="/kits" class:current={current === 'kits'}>工具</a>
            </div>
        </div>
    </nav>
</header>
<main>
    <slot />
</main>
<footer />

<style>
    .navbar.fixed {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
    .navbar .inner {
        display: flex;
        height: 30px;
        line-height: 2rem;
    }
    .navbar .inner .brand {
        height: 2rem;
        font-size: 700;
    }
    .navbar .inner .navi {
        flex: 1;
        text-align: right;
    }
    .navbar .inner .navi a {
        padding: 0 16px;
    }
</style>
