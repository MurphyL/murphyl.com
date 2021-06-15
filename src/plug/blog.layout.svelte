<script>
    export let current = 'home';
</script>

<header class="header">
    <nav class="navbar fixed">
        <div class="inner">
            <div class="brand">
                <a href="/">{process.env.APP_TITLE}</a>
            </div>
            <div class="navi">
                <a href="/docs" class:current={current === 'docs'}>文档</a>
                <a href="/blog" class:current={current === 'blog'}>Blog</a>
                <a href="/kits" class:current={current === 'kits'}>工具</a>
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
    .header .navbar .inner .navi a {
        padding: 0 16px;
    }
    .content {
        min-height: 300px;
    }
    .footer {
        border-top: 1px solid #eaecef;
    }
</style>
